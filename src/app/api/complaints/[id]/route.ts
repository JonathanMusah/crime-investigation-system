import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'

import prisma from '../../../../../prisma/client'
import { authOptions } from '../../auth/authOptions'

// Handle GET requests
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params

  // const id = req.nextUrl.searchParams.get('id') // Extracting 'id' from request

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  try {
    const complaint = await prisma.complaint.findUnique({
      where: { id: String(id) }
    })

    if (complaint) {
      if (session.user.role === 'ADMIN' || complaint.userId === session.user.id) {
        return NextResponse.json(complaint, { status: 200 })
      } else {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    } else {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching complaint' }, { status: 500 })
  }
}

// Handle PATCH requests
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized or Forbidden' }, { status: 401 })
  }

  const { id } = params

  // const id = req.nextUrl.searchParams.get('id') // Extracting 'id' from request

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  try {
    const { status } = await req.json()

    const updatedComplaint = await prisma.complaint.update({
      where: { id: String(id) },
      data: { status }
    })

    return NextResponse.json(updatedComplaint, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating complaint status' }, { status: 500 })
  }
}
