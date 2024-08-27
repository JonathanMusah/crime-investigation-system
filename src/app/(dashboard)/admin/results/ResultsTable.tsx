// app/results/page.tsx

'use client'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import axios from 'axios'
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

const ResultsPage = () => {
  const [results, setResults] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.get('/api/results')

      setResults(response.data)
    }

    fetchResults()
  }, [])

  return (
    <div>
      <Typography variant='h4' gutterBottom>
        Results
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={() => router.push('/admin/results/new')}
        style={{ marginBottom: '20px' }}
      >
        Create New Result
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Case Name</TableCell>
              <TableCell>Prediction Score</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result: any) => (
              <TableRow key={result.id}>
                <TableCell>{result.case.caseName}</TableCell>
                <TableCell>{result.prediction?.predictionScore.toFixed(2)}%</TableCell>
                <TableCell>{result.description}</TableCell>
                <TableCell>{result.status}</TableCell>
                <TableCell>{new Date(result.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ResultsPage
