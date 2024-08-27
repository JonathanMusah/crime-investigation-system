'use client'

// import { useState, useEffect } from 'react'

import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useSession } from 'next-auth/react'

// Define the shape of a case item
interface CaseItem {
  id: string
  caseId: string
  caseName: string
  status: string
  officers: {
    name: string
  }[]
}

const CaseTable = () => {
  const { data: session } = useSession()
  const [cases, setCases] = useState<CaseItem[]>([]) // Type the state with CaseItem[]

  useEffect(() => {
    const fetchCases = async () => {
      const response = await fetch('/api/cases')
      const casesData: CaseItem[] = await response.json() // Specify the type of the response

      setCases(casesData.slice(0, 10)) // Display only the 10 most recent cases
    }

    if (session) fetchCases()
  }, [session])

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Recent Cases
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Case ID</TableCell>
                <TableCell>Case Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assigned Officers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cases.map(caseItem => (
                <TableRow key={caseItem.id}>
                  <TableCell>{caseItem.caseId}</TableCell>
                  <TableCell>{caseItem.caseName}</TableCell>
                  <TableCell>{caseItem.status}</TableCell>
                  <TableCell>{caseItem.officers.map(officer => officer.name).join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default CaseTable
