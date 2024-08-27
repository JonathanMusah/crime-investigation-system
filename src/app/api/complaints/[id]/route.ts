import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'

import prisma from '../../../../../prisma/client'
import { authOptions } from '../../auth/[...nextauth]/route'

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
export async function PATCH(  req: NextRequest,
  { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized or Forbidden' }, { status: 401 })
  }
 
  const { id } = params;

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

// import type { NextApiRequest, NextApiResponse } from 'next'
// import { getServerSession } from 'next-auth/next'

// import prisma from '../../../../../prisma/client'
// import { authOptions } from '../../auth/[...nextauth]/route'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const session = await getServerSession(req, res, authOptions)

//     console.log('Session:', session) // Debugging line

//     if (!session) {
//       return res.status(401).json({ error: 'Unauthorized' })
//     }

//     const { id } = req.query

//     if (req.method === 'GET') {
//       try {
//         const complaint = await prisma.complaint.findUnique({
//           where: { id: String(id) }
//         })

//         if (complaint) {
//           if (session.user.role === 'ADMIN' || complaint.userId === session.user.id) {
//             return res.status(200).json(complaint)
//           } else {
//             return res.status(403).json({ error: 'Forbidden' })
//           }
//         } else {
//           return res.status(404).json({ error: 'Complaint not found' })
//         }
//       } catch (error) {
//         console.error('Error fetching complaint:', error)

//         return res.status(500).json({ error: 'Error fetching complaint' })
//       }
//     } else if (req.method === 'PATCH') {
//       if (session.user.role !== 'ADMIN') {
//         return res.status(403).json({ error: 'Forbidden' })
//       }

//       try {
//         const { status } = req.body

//         const updatedComplaint = await prisma.complaint.update({
//           where: { id: String(id) },
//           data: { status }
//         })

//         return res.status(200).json(updatedComplaint)
//       } catch (error) {
//         console.error('Error updating complaint status:', error)

//         return res.status(500).json({ error: 'Error updating complaint status' })
//       }
//     } else {
//       return res.status(405).json({ error: 'Method not allowed' })
//     }
//   } catch (error) {
//     console.error('Server Error:', error) // General error log

//     return res.status(500).json({ error: 'Internal server error' })
//   }
// }

// import type { NextApiRequest, NextApiResponse } from 'next'
// import { getServerSession } from 'next-auth/next'

// import prisma from '../../../../../prisma/client'
// import { authOptions } from '../../auth/[...nextauth]/route'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions)

//   if (!session) {
//     return res.status(401).json({ error: 'Unauthorized' })
//   }

//   const { id } = req.query

//   if (req.method === 'GET') {
//     try {
//       const complaint = await prisma.complaint.findUnique({
//         where: { id: String(id) }
//       })

//       if (complaint) {
//         if (session.user.role === 'ADMIN' || complaint.userId === session.user.id) {
//           res.status(200).json(complaint)
//         } else {
//           res.status(403).json({ error: 'Forbidden' })
//         }
//       } else {
//         res.status(404).json({ error: 'Complaint not found' })
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching complaint' })
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' })
//   }
// }

// import type { NextApiRequest, NextApiResponse } from 'next'
// import { getServerSession } from 'next-auth/next'

// // import { authOptions } from '../auth/[...nextauth]'
// import prisma from '../../../../../prisma/client'
// import { authOptions } from '../../auth/[...nextauth]/route'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions)

//   if (!session) {
//     return res.status(401).json({ error: 'Unauthorized' })
//   }

//   const { id } = req.query

//   if (req.method === 'GET') {
//     try {
//       const complaint = await prisma.complaint.findUnique({
//         where: { id: String(id) }
//       })

//       if (complaint) {
//         if (session.user.role === 'ADMIN' || complaint.userId === session.user.id) {
//           res.status(200).json(complaint)
//         } else {
//           res.status(403).json({ error: 'Forbidden' })
//         }
//       } else {
//         res.status(404).json({ error: 'Complaint not found' })
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching complaint' })
//     }
//   } else if (req.method === 'PATCH') {
//     if (session.user.role !== 'ADMIN') {
//       return res.status(403).json({ error: 'Forbidden' })
//     }

//     try {
//       const { status } = req.body

//       const updatedComplaint = await prisma.complaint.update({
//         where: { id: String(id) },
//         data: { status }
//       })

//       res.status(200).json(updatedComplaint)
//     } catch (error) {
//       res.status(500).json({ error: 'Error updating complaint status' })
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' })
//   }
// }
