import jwt from 'jsonwebtoken';
import { logger } from '@/config/logger';

interface TokenPayload {
  id: string;
  jti: string;
  iat: number;
  exp: number;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const generateTokens = (userId: string, jti: string, secret: string): Tokens => {
  try {
    const accessToken = jwt.sign(
      { id: userId, jti },
      secret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: userId, jti },
      secret,
      { expiresIn: '7d' }
    );

    logger.info(`[TOKENS_SERVICE] : Tokens generated for user ${userId}`);
    
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error('[TOKENS_SERVICE] : Error generating tokens:', error);
    throw error;
  }
};

export const verifyToken = (token: string, secret: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    logger.info(`[TOKENS_SERVICE] : Token verified for user ${decoded.id}`);
    return decoded;
  } catch (error) {
    logger.error('[TOKENS_SERVICE] : Error verifying token:', error);
    return null;
  }
};

export default {
  generateTokens,
  verifyToken,
};
