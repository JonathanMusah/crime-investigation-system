'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'

const fetchPredictions = async () => {
  const response = await axios.get('/api/predictions')

  return response.data
}

const PredictionTable = () => {
  const { data: predictions, isLoading, error } = useQuery({ queryKey: ['predictions'], queryFn: fetchPredictions })

  if (isLoading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Error loading predictions</Typography>

  if (!Array.isArray(predictions)) {
    return <Typography>No predictions available</Typography>;
  }

  
return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Case</TableCell>
            <TableCell>Prediction Score</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {predictions.map((prediction: any) => (
            <TableRow key={prediction.id}>
              <TableCell>{prediction.case.caseName}</TableCell>
              <TableCell>{prediction.predictionScore.toFixed(2)}%</TableCell>
              <TableCell>{prediction.status}</TableCell>
              <TableCell>{new Date(prediction.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PredictionTable
