import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }

  const token = authHeader.substring(7).trim();

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({
      message: 'Invalid or expired token',
    });
  }

  req.user = decoded;

  next();
};
