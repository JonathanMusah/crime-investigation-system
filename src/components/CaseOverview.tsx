'use client'
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/react'

// Define the shape of a case item
interface CaseItem {
  status: string
}

interface CaseStats {
  total: number
  active: number
  closed: number
}

const CaseOverview = () => {
  const { data: session } = useSession()
  const [caseStats, setCaseStats] = useState<CaseStats>({ total: 0, active: 0, closed: 0 })

  useEffect(() => {
    const fetchCaseStats = async () => {
      const response = await fetch('/api/cases')
      const cases: CaseItem[] = await response.json()

      const stats = cases.reduce<CaseStats>(
        (acc, caseItem) => {
          acc.total++

          if (caseItem.status === 'ACTIVE' || caseItem.status === 'IN_PROGRESS') {
            acc.active++
          } else if (caseItem.status === 'CLOSED') {
            acc.closed++
          }

          return acc
        },
        { total: 0, active: 0, closed: 0 }
      )

      setCaseStats(stats)
    }

    if (session) fetchCaseStats()
  }, [session])

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Case Overview
        </Typography>
        <Typography variant='body1'>Total Cases: {caseStats.total}</Typography>
        <Typography variant='body1'>Active Cases: {caseStats.active}</Typography>
        <Typography variant='body1'>Closed Cases: {caseStats.closed}</Typography>
      </CardContent>
    </Card>
  )
}

export default CaseOverview
