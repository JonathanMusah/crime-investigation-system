import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '../../auth/[...nextauth]/route'
import prisma from '../../../../../prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const announcement = await prisma.announcement.findUnique({
        where: { id: String(id) }
      })

      if (announcement) {
        res.status(200).json(announcement)
      } else {
        res.status(404).json({ error: 'Announcement not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching announcement' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
