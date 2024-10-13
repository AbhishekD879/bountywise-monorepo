import { lucia } from '@/lib/lucia'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
  if (!sessionId) {
    cookies().set('google_code_verifier', '')
    cookies().set('google_state', '')
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { session, user } = await lucia.validateSession(sessionId)
  if (!session) {
    cookies().set('google_code_verifier', '')
    cookies().set('google_state', '')
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  if (session.fresh) {
    // Refreshing the User Session
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  }

  // Return actual user data
  return Response.json({
    id: user.id || 'N/A',
    firstName: user.firstName || 'N/A',
    lastName: user.lastName || 'N/A',
    email: user.email || 'N/A',
    roleId: user.roleId || 'N/A',
    profilePicture: user.profilePicture || 'default.png'
  })
}
