'use client'
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useSession } from 'next-auth/react'

const SuspectsByStatus = () => {
  const { data: session } = useSession()
  const [suspectData, setSuspectData] = useState<{ name: string; value: any }[]>([])

  useEffect(() => {
    const fetchSuspects = async () => {
      const response = await fetch('/api/suspects')
      const suspects = await response.json()

      const data = [
        { name: 'Wanted', value: suspects.filter((s: { status: string }) => s.status === 'WANTED').length },
        { name: 'In Custody', value: suspects.filter((s: { status: string }) => s.status === 'IN_CUSTODY').length },
        { name: 'Cleared', value: suspects.filter((s: { status: string }) => s.status === 'CLEARED').length }
      ]

      setSuspectData(data)
    }

    if (session) fetchSuspects()
  }, [session])

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Suspects by Status
        </Typography>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={suspectData}>
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='value' fill='#8884d8' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default SuspectsByStatus
