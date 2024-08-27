import { NextResponse, type NextRequest } from 'next/server'

import prisma from '../../../../prisma/client'
import { caseOfficerSchema } from '@/app/ValidationSchemas'


export async function GET() {
  try {
    const cases = await prisma.case.findMany({
      include: {
        officers: {
          include: {
            officer: {
              include: {
                user: true
              }
            }
          }
        }
      }
    })

    const formattedCases = cases.map(caseItem => ({
      id: caseItem.id,
      caseId: caseItem.caseId,
      caseName: caseItem.caseName,
      Description: caseItem.Description,
      status: caseItem.status,
      officers: caseItem.officers.map(co => ({
        id: co.officer.id,
        name: co.officer.name,
        email: co.officer.user.email,
        avatarSrc: co.officer.picture
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
  const validation = caseOfficerSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  try {
    const newCaseOfficer = await prisma.caseOfficer.create({
      data: {
        case: { connect: { id: body.caseId } },
        officer: { connect: { id: body.officerId } }
      }
    })

    return NextResponse.json(newCaseOfficer, { status: 201 })
  } catch (error) {
    console.error('Error creating CaseOfficer:', error)

    return NextResponse.json({ error: 'Failed to create CaseOfficer' }, { status: 500 })
  }
}
