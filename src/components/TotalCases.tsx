'use client'
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useSession } from 'next-auth/react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const TotalCases = () => {
  const { data: session } = useSession()
  const [caseData, setCaseData] = useState<{ name: string; value: any }[]>([])

  useEffect(() => {
    const fetchCaseData = async () => {
      const response = await fetch('/api/cases')
      const cases = await response.json()

      const data = [
        { name: 'Active', value: cases.filter((c: { status: string }) => c.status === 'ACTIVE').length },
        { name: 'In Progress', value: cases.filter((c: { status: string }) => c.status === 'IN_PROGRESS').length },
        { name: 'Pending', value: cases.filter((c: { status: string }) => c.status === 'PENDING').length },
        { name: 'Closed', value: cases.filter((c: { status: string }) => c.status === 'CLOSED').length }
      ]

      setCaseData(data)
    }

    if (session) fetchCaseData()
  }, [session])

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Total Cases
        </Typography>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie data={caseData} cx='50%' cy='50%' labelLine={false} outerRadius={80} fill='#8884d8' dataKey='value'>
              {caseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {caseData.map((entry, index) => (
          <Typography key={index} variant='body2'>
            {entry.name}: {entry.value}
          </Typography>
        ))}
      </CardContent>
    </Card>
  )
}

export default TotalCases
