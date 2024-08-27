import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import prisma from '../../../../prisma/client'

export async function GET(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(announcements)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching announcements' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (token.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { title, content } = await req.json()

    const announcement = await prisma.announcement.create({
      data: { title, content }
    })

    return NextResponse.json(announcement, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating announcement' }, { status: 500 })
  }
}
