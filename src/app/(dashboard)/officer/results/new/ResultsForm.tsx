// app/results/new/page.tsx

'use client'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import {
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material'

interface ResultFormData {
  caseId: string
  predictionId: string
  description: string
  status: string
}

const NewResultPage = () => {
  const [cases, setCases] = useState([])
  const [predictions, setPredictions] = useState([])
  const { control, handleSubmit, watch } = useForm<ResultFormData>()
  const router = useRouter()
  const selectedCaseId = watch('caseId')

  useEffect(() => {
    const fetchCases = async () => {
      const response = await axios.get('/api/cases')

      setCases(response.data)
    }

    fetchCases()
  }, [])

  useEffect(() => {
    if (selectedCaseId) {
      const fetchPredictions = async () => {
        const response = await axios.get(`/api/predictions?caseId=${selectedCaseId}`)

        setPredictions(response.data)
      }

      fetchPredictions()
    }
  }, [selectedCaseId])

  const onSubmit = async (data: ResultFormData) => {
    try {
      await axios.post('/api/results', data)
      router.push('/officer/results')
    } catch (error) {
      console.error('Error creating result:', error)
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Create New Result
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Case</InputLabel>
                <Controller
                  name='caseId'
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      {cases.map((caseItem: any) => (
                        <MenuItem key={caseItem.id} value={caseItem.id}>
                          {caseItem.caseName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Prediction</InputLabel>
                <Controller
                  name='predictionId'
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      {predictions.map((prediction: any) => (
                        <MenuItem key={prediction.id} value={prediction.id}>
                          Prediction Score: {prediction.predictionScore.toFixed(2)}%
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                render={({ field }) => <TextField {...field} fullWidth multiline rows={4} label='Description' />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Controller
                  name='status'
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value='ACTIVE'>Active</MenuItem>
                      <MenuItem value='CLOSED'>Closed</MenuItem>
                      <MenuItem value='IN_PROGRESS'>In Progress</MenuItem>
                      <MenuItem value='PENDING'>Pending</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary'>
                Create Result
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewResultPage
