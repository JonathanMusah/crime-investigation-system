import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// import { evidenceSchema } from '@/app/(dashboard)/admin/evidence/new/AddEvidenceForm'
import prisma from '../../../../prisma/client'
import { evidenceSchema } from '@/app/ValidationSchemas'

// POST method to create new evidence
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validation = evidenceSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const { caseId, relatedSuspects, images, ...evidenceData } = validation.data

    const newEvidence = await prisma.evidence.create({
      data: {
        ...evidenceData,
        caseNumber: caseId,
        case: { connect: { id: caseId } },
        chainOfCustody: evidenceData.chainOfCustody,
        EvidenceSuspect: {
          create: relatedSuspects.map(suspect => ({
            suspect: { connect: { id: suspect.id } }
          }))
        },
        EvidenceImage: {
          create: images.map(publicId => ({
            publicId
          }))
        }
      }
    })

    return NextResponse.json(newEvidence, { status: 201 })
  } catch (error) {
    console.error('Error creating Evidence:', error)

    return NextResponse.json({ error: 'Failed to create Evidence' }, { status: 500 })
  }
}

// GET method to fetch all evidence
export async function GET() {
  try {
    const evidence = await prisma.evidence.findMany({
      include: {
        case: true,
        EvidenceImage: true,
        EvidenceSuspect: {
          include: {
            suspect: true
          }
        }
      }
    })

    return NextResponse.json(evidence, { status: 200 })
  } catch (error) {
    console.error('Error fetching Evidence:', error)

    return NextResponse.json({ error: 'Failed to fetch Evidence' }, { status: 500 })
  }
}
