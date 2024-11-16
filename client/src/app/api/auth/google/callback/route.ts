import { lucia } from '@/lib/lucia'
import { google } from '@/lib/oAuth/googleOAuth'
import { Roles } from '@/lib/roles'
import db from '@/lib/tembo.db'
import { userTable } from '@/schema'
import { sql } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { v4 } from 'uuid'
import BloomFilterSingleton from "@/lib/bloomsetup";

const bloomFilter = BloomFilterSingleton.getInstance()

async function createUserSession(userId: string) {
  const session = await lucia.createSession(userId, {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true
  })
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  if (!code || !state) {
    return new Response('Invalid Request', { status: 400 })
  }

  const savedState = cookies().get('google_state')?.value
  const codeVerifier = cookies().get('google_code_verifier')?.value

  if (!codeVerifier || !savedState) {
    return new Response('Invalid Request', { status: 400 })
  }

  if (state !== savedState) {
    return new Response('State Mismatch', { status: 400 })
  }

  try {
    const { accessToken } = await google.validateAuthorizationCode(code, codeVerifier)

    const googleResponse = await fetch(process.env.GOOGLE_USERINFO_API!, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!googleResponse.ok) {
      return new Response('Failed to fetch Google user data', { status: 500 })
    }

    const googleData = await googleResponse.json()

    const mightExist = bloomFilter.isCombinationInFilter(googleData.email)

    // Can be False Positive But not false negative
    if(mightExist){
      const user = await db.query.userTable.findFirst({
        where: sql`${userTable.email} = ${googleData.email}`
      })
      if (user) {
            await createUserSession(user.id)
      }
    }else {
        const userId = v4()
        await db.insert(userTable).values({
            id: userId,
            email: googleData.email,
            roleId: Roles.user,
            firstName: googleData.given_name,
            lastName: googleData.family_name,
            profilePicture: googleData.picture || `https://robohash.org/${userId}`
        })
        await createUserSession(userId)
        bloomFilter.addCombination(googleData.email);
    }

    return NextResponse.redirect(new URL('/', req.url))
  } catch (error) {
    console.error('OAuth error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
