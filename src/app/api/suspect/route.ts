import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// import { suspectSchema } from '@/app/(dashboard)/admin/suspect/new/AddSuspectForm'
import prisma from '../../../../prisma/client'
import { suspectSchema } from '@/app/ValidationSchemas'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log('Received body:', body)
    const validation = suspectSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 })
    }

    const { associates, socialMedia, alibi, caseId, ...suspectData } = validation.data

    const newSuspect = await prisma.suspect.create({
      data: {
        ...suspectData,
        associates: {
          create: associates
        },
        socialMedia: {
          create: socialMedia
        },
        alibi: {
          create: alibi
        },
        cases: {
          create: {
            case: {
              connect: {
                id: caseId
              }
            }
          }
        }
      },
      include: {
        cases: true,
        associates: true,
        socialMedia: true,
        alibi: true
      }
    })

    return NextResponse.json(newSuspect, { status: 201 })
  } catch (error) {
    console.error('Error creating Suspect:', error)

    return NextResponse.json({ error: 'Failed to create Suspect' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const caseId = searchParams.get('caseId')
    const suspectId = searchParams.get('suspectId')

    let suspects

    if (suspectId) {
      // Fetch a specific suspect
      suspects = await prisma.suspect.findUnique({
        where: { id: suspectId },
        include: {
          cases: true,
          associates: true,
          socialMedia: true,
          alibi: true
        }
      })
    } else if (caseId) {
      // Fetch all suspects for a specific case
      suspects = await prisma.suspect.findMany({
        where: {
          cases: {
            some: {
              caseId: caseId
            }
          }
        },
        include: {
          cases: true,
          associates: true,
          socialMedia: true,
          alibi: true
        }
      })
    } else {
      // Fetch all suspects
      suspects = await prisma.suspect.findMany({
        include: {
          cases: true,
          associates: true,
          socialMedia: true,
          alibi: true
        }
      })
    }

    if (!suspects) {
      return NextResponse.json({ error: 'No suspects found' }, { status: 404 })
    }

    return NextResponse.json(suspects)
  } catch (error) {
    console.error('Error fetching Suspects:', error)

    return NextResponse.json({ error: 'Failed to fetch Suspects' }, { status: 500 })
  }
}
