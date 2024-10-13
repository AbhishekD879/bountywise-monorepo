import { lucia } from '@/lib/lucia'
import { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  console.log('cookie name', lucia.sessionCookieName)
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null

  if (!sessionId) {
    cookies().set('google_code_verifier', '')
    cookies().set('google_state', '')
    console.log('No Session Id', sessionId)
    return NextResponse.json({ isValid: false }, { status: 200 })
  }

  const { session, user } = await lucia.validateSession(sessionId)
  if (!session) {
    cookies().set('google_code_verifier', '')
    cookies().set('google_state', '')
    console.log('No Session Id validate', session)
    return NextResponse.json({ isValid: false }, { status: 200 })
  }

  // Return actual user data
  return Response.json({ isValid: true }, { status: 200 })
}
