import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const JWT_SECRET = env.JWT_SECRET;
const JWT_EXPIRES = env.JWT_EXPIRES_IN;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

interface JwtPayload {
  userId: string;
}

export const generateToken = ({ userId }: JwtPayload) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES as jwt.SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
