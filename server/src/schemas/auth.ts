import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string({
    message: 'Complete this field to continue',
  }),
  email: z.email({
    message: 'Complete this field to continue',
  }),
  password: z
    .string({
      message: 'Complete this field to continue',
    })
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'Password must contain at least one special character',
    })
    .regex(/\d/, {
      message: 'Password must contain at least one number',
    }),
});
