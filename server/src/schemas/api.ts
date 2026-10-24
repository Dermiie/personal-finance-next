import z from 'zod';

export const ApiErrorDetailsSchema = z.record(z.string(), z.unknown());

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  requestId: z.string().uuid().optional(),
  details: ApiErrorDetailsSchema.default({}),
});

export const ApiErrorEnvelopeSchema = z.object({
  error: ApiErrorSchema,
});
