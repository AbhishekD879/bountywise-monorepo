import { z } from 'zod'

export const bountySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().optional(),
  tags: z.string().min(1, 'At least one tag is required'),
  communicationMethod: z.enum(['video', 'audio', 'chat']),
  budget: z.number().nullable().optional(),
  currency: z.string().optional().nullable(),
  deadline: z.date().optional().nullable(),
  attachments: z
    .array(
      z.object({
        name: z.string().optional(),
        size: z.number().optional(),
        type: z.string().optional()
      }).optional()
    ).optional()
    .optional()
})
