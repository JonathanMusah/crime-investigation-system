// pages/api/predictions.ts

// import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import type { PredictionStatus } from '@prisma/client'

import prisma from '../../../../prisma/client'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      caseId,
      suspectImage,
      logicalScore,
      physicalScore,
      distanceFromCrime,
      facialExpression,
      predictionScore,
      status
    } = body

    const data = {
      caseId: String(caseId),
      suspectImage: String(suspectImage),
      logicalScore: parseFloat(logicalScore),
      physicalScore: parseFloat(physicalScore),
      distanceFromCrime: parseFloat(distanceFromCrime),
      facialExpression: String(facialExpression),
      predictionScore: parseFloat(predictionScore),
      status: status as PredictionStatus
    }

    const newPrediction = await prisma.prediction.create({ data })

    return NextResponse.json(newPrediction, { status: 201 })
  } catch (error) {
    console.error('Error creating prediction:', error)

    return NextResponse.json({ error: 'Error creating prediction', details: (error as Error).message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const predictions = await prisma.prediction.findMany({
      include: {
        case: {
          select: {
            caseName: true
          }
        }
      }
    })

    return NextResponse.json(predictions)
  } catch (error) {
    console.error('Error fetching predictions:', error)

    return NextResponse.json({ error: 'Error fetching predictions' }, { status: 500 })
  }
}
