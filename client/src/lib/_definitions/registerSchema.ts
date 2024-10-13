import z from 'zod'

export default z
  .object({
    email: z.string().trim().email('Invalid Email Provided'),
    password: z
      .string()
      .trim()
      .min(8, 'Password Should be Minimum 8 character')
      .max(20, 'Password should not exceed 20 characters'),
    confirmPassword: z
      .string()
      .trim()
      .min(8, 'Password Should be Minimum 8 character')
      .max(20, 'Password should not exceed 20 characters')
  })
  .refine((args) => args.confirmPassword === args.password, {
    message: 'Password and confirm password do not match',
    path: ['password']
  })
