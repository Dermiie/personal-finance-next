import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({
  path: fileURLToPath(new URL('../../.env', import.meta.url)),
});

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(5001),

  DB_CONNECTIONSTRING: z
    .string()
    .trim()
    .min(1, 'Set MONGODB_URI to your MongoDB Atlas connection string.'),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('1d'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  GOOGLE_CLIENT_ID: z.string().trim().optional().default(''),
});

const parsedEnvironment = environmentSchema.parse(process.env);

export const env = {
  ...parsedEnvironment,
  // corsOrigins: parsedEnvironment.CORS_ORIGIN.split(',')
  //   .map((origin) => origin.trim())
  //   .filter(Boolean),
};
