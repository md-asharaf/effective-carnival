import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { APIError } from '@/utils/APIError';
import catchAsync from '@/handlers/async.handler';
import envVars from '@/config/envVars';
import {db as prisma} from '@/config/database';

export const authenticateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new APIError(
        401,
        'Authentication required. Please provide a valid token.'
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, envVars.JWT_SECRET) as jwt.JwtPayload;

      // Check if payload has the required properties
      if (!decoded.id || !decoded.jti) {
        throw new APIError(401, 'Invalid token payload.');
      }

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new APIError(
          401,
          'Unauthorized. User associated with this token not found.'
        );
      }

      // Attach user to the request object
      req.user = {
        ...user,
        phone: user.phone || undefined,
      };

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new APIError(401, 'Token has expired. Please log in again.');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new APIError(401, 'Invalid token. Please log in again.');
      }
      if (error instanceof APIError) {
        throw error;
      }
      console.error('User Authentication error:', error);
      throw new APIError(
        500,
        'An unexpected error occurred during user authentication.'
      );
    }
  }
);

export const authenticateAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new APIError(
        401,
        'Authentication required. Please provide a valid token.'
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, envVars.JWT_SECRET) as jwt.JwtPayload;

      // Check if payload has the required properties
      if (!decoded.id || !decoded.jti || !decoded.role) {
        throw new APIError(401, 'Invalid token payload.');
      }

      // Check if admin role
      if (decoded.role !== 'admin') {
        throw new APIError(403, 'Access denied. Admin privileges required.');
      }

      // Check if admin exists
      const admin = await prisma.admin.findUnique({
        where: { id: decoded.id },
      });

      if (!admin) {
        throw new APIError(
          401,
          'Unauthorized. Admin associated with this token not found.'
        );
      }

      // Attach admin to the request object
      req.admin = admin;

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new APIError(401, 'Token has expired. Please log in again.');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new APIError(401, 'Invalid token. Please log in again.');
      }
      if (error instanceof APIError) {
        throw error;
      }
      console.error('Admin Authentication error:', error);
      throw new APIError(
        500,
        'An unexpected error occurred during admin authentication.'
      );
    }
  }
);
