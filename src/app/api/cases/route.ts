import { type NextRequest, NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'

import { caseSchema } from '@/app/ValidationSchemas'
import prisma from '../../../../prisma/client'
import { authOptions } from '../auth/authOptions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    let cases

    if (session.user.role === 'ADMIN') {
      // Fetch all cases for admin
      cases = await prisma.case.findMany({
        include: {
          officers: {
            include: {
              officer: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      image: true
                    }
                  }
                }
              }
            }
          }
        }
      })
    } else if (session.user.role === 'OFFICER') {
      // Fetch only cases assigned to this officer
      cases = await prisma.case.findMany({
        where: {
          officers: {
            some: {
              officer: {
                userId: session.user.id
              }
            }
          }
        },
        include: {
          officers: {
            include: {
              officer: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      image: true
                    }
                  }
                }
              }
            }
          }
        }
      })
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Format the cases to include officer information
    const formattedCases = cases.map(caseItem => ({
      id: caseItem.id,
      caseId: caseItem.caseId,
      caseName: caseItem.caseName,
      Description: caseItem.Description,
      status: caseItem.status,
      officers: caseItem.officers.map(co => ({
        id: co.officer.id,
        name: co.officer.user.name,
        email: co.officer.user.email,
        avatarSrc: co.officer.user.image
      }))
    }))

    return NextResponse.json(formattedCases)
  } catch (error) {
    console.error('Error fetching cases:', error)

    return NextResponse.json({ error: 'Error fetching cases' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = caseSchema.safeParse(body)

  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })

  const newCase = await prisma.case.create({
    data: {
      caseName: body.caseName,
      Description: body.Description,
      status: body.status || 'PENDING'
    }
  })

  return NextResponse.json(newCase, { status: 201 })
}
