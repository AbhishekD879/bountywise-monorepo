import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookiess = cookies().get('firstName')?.value

  console.log(cookiess, 'parleG - cookies')

  return NextResponse.json({
    protected: true,
    message: 'users route'
  })
}
