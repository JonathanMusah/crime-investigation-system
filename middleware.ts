import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  const { pathname } = request.nextUrl

  // Check if the user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // Role-based access control
  if (pathname.startsWith('/officer') && token.role !== 'OFFICER') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  if (pathname.startsWith('/admin') && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/officer/:path*', '/admin/:path*']
}
