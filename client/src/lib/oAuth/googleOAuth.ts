import { Google } from 'arctic'
console.log(process.env.NEXT_PUBLIC_ORIGIN! + process.env.GOOGLE_REDIRECT_URI)
export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.NEXT_PUBLIC_ORIGIN! + process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!
)
