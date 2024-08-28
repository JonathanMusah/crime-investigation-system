import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'

import prisma from '../../../../prisma/client'
import { authOptions } from '../auth/authOptions'

// Handler for POST requests
export async function POST(req: NextRequest) {
  // Use `getServerSession` correctly
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, description } = await req.json()

    const complaint = await prisma.complaint.create({
      data: {
        title,
        description,
        userId: session.user.id,
        status: 'OPEN'
      }
    })

    return NextResponse.json(complaint, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating complaint' }, { status: 500 })
  }
}

// Handler for GET requests
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const complaints = await prisma.complaint.findMany({
      where: session.user.role === 'ADMIN' ? {} : { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(complaints, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching complaints' }, { status: 500 })
  }
}
