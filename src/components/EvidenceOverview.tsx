'use client'
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useSession } from 'next-auth/react'

const EvidenceOverview = () => {
  const { data: session } = useSession()

  const [evidenceList, setEvidenceList] = useState<
    { description: string; evidenceType: string; collectionDate: string }[]
  >([])

  useEffect(() => {
    const fetchEvidence = async () => {
      const response = await fetch('/api/evidence')
      const evidence = await response.json()

      setEvidenceList(evidence.slice(0, 5)) // Display only the 5 most recent pieces of evidence
    }

    if (session) fetchEvidence()
  }, [session])

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Recent Evidence
        </Typography>
        <List>
          {evidenceList.map((evidence, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={evidence.description}
                secondary={`Type: ${evidence.evidenceType} | Collected on: ${new Date(evidence.collectionDate).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default EvidenceOverview
