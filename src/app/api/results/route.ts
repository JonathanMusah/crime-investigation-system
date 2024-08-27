// app/api/results/route.ts

import { NextResponse } from 'next/server'

import prisma from '../../../../prisma/client'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { caseId, predictionId, description, status } = body

    const newResult = await prisma.result.create({
      data: {
        caseId,
        predictionId,
        description,
        status
      }
    })

    // Update the case status
    await prisma.case.update({
      where: { id: caseId },
      data: { status }
    })

    return NextResponse.json(newResult, { status: 201 })
  } catch (error) {
    console.error('Error creating result:', error)

    return NextResponse.json({ error: 'Error creating result' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const caseId = searchParams.get('caseId')

  try {
    const results = await prisma.result.findMany({
      where: caseId ? { caseId } : undefined,
      include: {
        case: { select: { caseName: true } },
        prediction: { select: { predictionScore: true } }
      }
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching results:', error)

    return NextResponse.json({ error: 'Error fetching results' }, { status: 500 })
  }
}
