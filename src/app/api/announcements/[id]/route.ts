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

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  try {
    const announcement = await prisma.announcement.findUnique({
      where: { id: String(id) }
    })

    if (announcement) {
      return NextResponse.json(announcement, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching announcement' }, { status: 500 })
  }
}

// Handle PATCH requests (if needed)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized or Forbidden' }, { status: 401 })
  }

  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  try {
    const data = await req.json()

    const updatedAnnouncement = await prisma.announcement.update({
      where: { id: String(id) },
      data
    })

    return NextResponse.json(updatedAnnouncement, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating announcement' }, { status: 500 })
  }
}

// import type { NextApiRequest, NextApiResponse } from 'next'
// import { getServerSession } from 'next-auth/next'

// import { authOptions } from '../../auth/[...nextauth]/route'
// import prisma from '../../../../../prisma/client'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions)

//   if (!session) {
//     return res.status(401).json({ error: 'Unauthorized' })
//   }

//   const { id } = req.query

//   if (req.method === 'GET') {
//     try {
//       const announcement = await prisma.announcement.findUnique({
//         where: { id: String(id) }
//       })

//       if (announcement) {
//         res.status(200).json(announcement)
//       } else {
//         res.status(404).json({ error: 'Announcement not found' })
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching announcement' })
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' })
//   }
// }
