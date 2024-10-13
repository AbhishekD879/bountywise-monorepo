import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, res: NextResponse) {
  const path = request.nextUrl.pathname
  const url = request.nextUrl.clone()

  if (path.startsWith('/private') || path.startsWith('/api/private')) {
    console.log('path', path)
    // Extract all cookies from the request header
    const cookies = request.headers.get('cookie') || ''

    // Forward the cookie to the validate-cookie API
    const cookieValidationResponse = await fetch(`${url.origin}/api/auth/validate-cookie`, {
      headers: {
        cookie: cookies // Set the cookie header for the API request
      }
    })

    const result = await cookieValidationResponse.json()

    // You can perform a redirect if the cookie is not valid
    if (!result.isValid) {
      if (path.startsWith('/api/private')) {
        /**
         * TODO: Something wrong here Commented out For Restoring Functionality
         */
        // return NextResponse.redirect(new URL("/login", request.url));
      } else {
        return NextResponse.redirect(new URL(`/login?redirect=${path}`, request.url))
      }
    }
  }
  if (path.startsWith('/api/private/ms')) {
    // private api routes
  }
}
