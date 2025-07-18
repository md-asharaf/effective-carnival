import {
  registerInterface,
  verifyRegistrationInterface,
} from '@/@types/interface';
import { redis } from '@/config/database';
import catchAsync from '@/handlers/async.handler';
import { APIError } from '@/utils/APIError';
import { Request, Response } from 'express';
import {db as prisma} from '@/config/database';
import { sendOtp, validateOtp } from '@/services/otp.service';
import { generateTokens, verifyToken } from '@/services/tokens.service';
import envVars from '@/config/envVars';
import crypto from 'crypto';

const initiateRegister = catchAsync(async (req: Request, res: Response) => {
  const { name, email, phone } = req.body as registerInterface;
  if (!email || !name) {
    throw new APIError(
      400,
      'Missing required fields: name and email are required'
    );
  }
  try {
    console.log("HELLO WORLD")
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new APIError(409, 'User with this email already exists');
    }

    // Store registration data temporarily
    await redis.setValue(
      `register:${email}`,
      JSON.stringify({ name, email, phone }),
      60 * 60 // 1 hour
    );

    // Send OTP for verification
    const { message, status, otp } = await sendOtp(email);
    if (status === 'error' || !otp) {
      throw new APIError(500, message);
    }

    res.status(200).json({
      status: 'success',
      message: 'Registration initiated successfully. Please check your email for the verification code.',
      data: { otp }, // Remove in production
    });
  } catch (error) {
    if (error instanceof APIError) throw error;
    console.error('Error initiating registration:', error);
    throw new APIError(500, 'Internal Server Error');
  }
});

const verifyRegistration = catchAsync(async (req: Request, res: Response) => {
  const { email, code } = req.body as verifyRegistrationInterface;
  if (!email || !code) {
    throw new APIError(
      400,
      'Missing required fields: email and code are required'
    );
  }
  try {
    // Validate OTP
    const validateOtpData = await validateOtp(email, code);
    if (validateOtpData.status === 'error') {
      throw new APIError(400, validateOtpData.message);
    }

    // Get stored registration data
    const storedData = await redis.getValue(`register:${email}`);
    if (!storedData) {
      throw new APIError(400, 'Registration session expired. Please try again.');
    }

    const userData = JSON.parse(storedData);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      },
    });

    // Generate JWT tokens
    const jti = crypto.randomUUID();
    const jwtSecret = envVars.JWT_SECRET || 'your_jwt_secret';
    const { accessToken, refreshToken } = generateTokens(
      user.id,
      jti,
      jwtSecret
    );

    // Clean up stored data
    await redis.deleteValue(`register:${email}`);

    res.status(201).json({
      status: 'success',
      message: 'Registration completed successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof APIError) throw error;
    console.error('Error verifying registration:', error);
    throw new APIError(500, 'Internal Server Error');
  }
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    throw new APIError(400, 'Missing required fields: email is required');
  }
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new APIError(404, 'User with this email does not exist');
    }

    // Send OTP for verification
    const { message, status, otp } = await sendOtp(email);
    if (status === 'error' || !otp) {
      throw new APIError(500, message);
    }

    res.status(200).json({
      status: 'success',
      message: 'Login initiated successfully. Please check your email for the OTP.',
      data: { otp }, // Remove in production
    });
  } catch (error) {
    if (error instanceof APIError) throw error;
    console.error('Error during login:', error);
    throw new APIError(500, 'Internal Server Error');
  }
});

const verifyLogin = catchAsync(async (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !code) {
    throw new APIError(400, 'Missing required fields: email and code are required');
  }
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new APIError(404, 'User with this email does not exist');
    }

    // Validate OTP
    const validateOtpData = await validateOtp(email, code);
    if (validateOtpData.status === 'error') {
      throw new APIError(400, validateOtpData.message);
    }

    // Generate JWT tokens
    const jti = crypto.randomUUID();
    const jwtSecret = envVars.JWT_SECRET || 'your_jwt_secret';
    const { accessToken, refreshToken } = generateTokens(
      user.id,
      jti,
      jwtSecret
    );

    res.status(200).json({
      status: 'success',
      message: 'Login verified successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof APIError) throw error;
    console.error('Error verifying login:', error);
    throw new APIError(500, 'Internal Server Error');
  }
});

const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    throw new APIError(400, 'Missing required fields: token is required');
  }
  try {
    // Verify the refresh token
    const secretKey = envVars.JWT_SECRET;
    const decodedToken = verifyToken(token, secretKey);
    if (!decodedToken) {
      throw new APIError(401, 'Invalid or expired refresh token');
    }

    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });
    if (!user) {
      throw new APIError(401, 'User not found');
    }

    // Generate new access and refresh tokens
    const jti = crypto.randomUUID();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      decodedToken.id,
      jti,
      secretKey
    );

    res.status(200).json({
      status: 'success',
      message: 'Tokens refreshed successfully',
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    if (error instanceof APIError) throw error;
    console.error('Error refreshing tokens:', error);
    throw new APIError(500, 'Internal Server Error');
  }
});

const logout = catchAsync(async (req: Request, res: Response) => {
  // In a more sophisticated setup, you might want to blacklist the token
  // For now, we'll just return a success response
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
});

export default {
  initiateRegister,
  verifyRegistration,
  login,
  verifyLogin,
  refreshTokens,
  logout,
};
