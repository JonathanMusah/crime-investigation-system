// pages/api/public-statistics.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '../../../../prisma/client'

// import prisma from '@/lib/prisma'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const openCases = await prisma.case.count({ where: { status: 'ACTIVE' } })
    const solvedCases = await prisma.case.count({ where: { status: 'CLOSED' } })
    const officersOnDuty = await prisma.officer.count({ where: { isDeleted: false } })
    const pendingReports = await prisma.complaint.count({ where: { status: 'OPEN' } })

    return NextResponse.json({
      openCases,
      solvedCases,
      officersOnDuty,
      pendingReports
    })
  } catch (error) {
    console.error('Error fetching public statistics:', error)

    return NextResponse.json({ error: 'Error fetching public statistics' }, { status: 500 })
  }
}
