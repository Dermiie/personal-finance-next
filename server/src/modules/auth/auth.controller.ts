import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { signUpSchema } from '../../schemas/auth';
import { User } from '../../models/users';
import { AppError } from '../../errors/app-error';
import { JwtPayload } from 'jsonwebtoken';
import JWT from 'jsonwebtoken';

export async function signUp(req: Request, res: Response) {
  const data = signUpSchema.parse(req.body);

  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new AppError(409, 'EMAIL_ALREADY_EXISTS', 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const newUser = await User.create({
    fullName: data.fullName,
    email: data.email,
    password: hashedPassword,
  });

  const payload: JwtPayload = {
    id: newUser._id.toString(),
  };

  const jwt_secret_key: string | undefined = process.env.JWT_SECRET;

  const token = JWT.sign(payload, jwt_secret_key!, {
    expiresIn: '15m',
  }); // signs our payload with secret key

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    user: {
      id: newUser._id,
      email: newUser.email,
    },
    token,
  });
  console.log(newUser, token);
}
