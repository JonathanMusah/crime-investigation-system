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
  Slider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  Snackbar
} from '@mui/material'

import { useQuery } from '@tanstack/react-query'

import type { PredictionStatus } from '@prisma/client'

import CloudinaryUpload from '@/components/CloudinaryUpload'

interface PredictionFormData {
  caseId: string
  suspectImage: string
  logicalScore: number
  physicalScore: number
  distanceFromCrime: number
}

interface ExpressionData {
  predictions: {
    [key: string]: { confidence: number; class_id: number }
  }
}

interface PredictionData {
  caseId: string
  suspectImage: string
  logicalScore: number
  physicalScore: number
  distanceFromCrime: number
  facialExpression: string
  predictionScore: number
  status: PredictionStatus
}

const fetchCases = async () => {
  const response = await axios.get('/api/cases')

  return response.data
}

const PredictionPage = () => {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const { control, handleSubmit, setValue } = useForm<PredictionFormData>()

  const { data: cases } = useQuery({ queryKey: ['cases'], queryFn: fetchCases })
  const [uploadedImageId, setUploadedImageId] = useState<string>('')

  const [predictionResult, setPredictionResult] = useState<any>(null)

  const handleImageUpload = (publicId: string) => {
    setValue('suspectImage', publicId)
    setUploadedImageId(publicId)
  }

  const handleImageReset = () => {
    setValue('suspectImage', '')
    setUploadedImageId('')
  }

  const analyzeFacialExpression = async (imageUrl: string) => {
    try {
      const response = await axios.post(
        '/api/analyze-expression',
        { imageUrl },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('Facial expression analysis response:', response.data)

      return response.data
    } catch (error) {
      console.error('Error analyzing facial expression:', error)

      return null
    }
  }

  // const calculatePredictionScore = (data: PredictionFormData, expressionData: any) => {
  //   const expressionScore = expressionData.predictions.Happy.confidence
  //   const logicalWeight = 0.3
  //   const physicalWeight = 0.3
  //   const expressionWeight = 0.3
  //   const distanceWeight = 0.1

  //   const normalizedDistance = Math.min(data.distanceFromCrime / 100, 1)
  //   const distanceScore = 1 - normalizedDistance

  //   const score =
  //     data.logicalScore * logicalWeight +
  //     data.physicalScore * physicalWeight +
  //     expressionScore * expressionWeight +
  //     distanceScore * distanceWeight

  //   return score * 100 // Convert to percentage
  // }
  const calculatePredictionScore = (data: PredictionFormData, expressionData: ExpressionData) => {
    const expressionScore = expressionData.predictions.Happy.confidence
    const logicalWeight = 0.3
    const physicalWeight = 0.3
    const expressionWeight = 0.3
    const distanceWeight = 0.1

    const normalizedDistance = Math.min(data.distanceFromCrime / 100, 1)
    const distanceScore = 1 - normalizedDistance

    const score =
      (data.logicalScore / 100) * logicalWeight +
      (data.physicalScore / 100) * physicalWeight +
      expressionScore * expressionWeight +
      distanceScore * distanceWeight

    return Math.min(score * 100, 100) // Ensure the score doesn't exceed 100
  }

  const onSubmit = async (data: PredictionFormData) => {
    const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${data.suspectImage}`

    // const expressionData = await analyzeFacialExpression(imageUrl)
    const expressionData: ExpressionData | null = await analyzeFacialExpression(imageUrl)

    if (expressionData) {
      const score = calculatePredictionScore(data, expressionData)

      const dominantEmotion = Object.entries(expressionData.predictions).reduce((a, b) =>
        a[1].confidence > b[1].confidence ? a : b
      )[0] as string

      const predictionData: PredictionData = {
        caseId: data.caseId,
        suspectImage: data.suspectImage,
        logicalScore: parseFloat(data.logicalScore.toString()),
        physicalScore: parseFloat(data.physicalScore.toString()),
        distanceFromCrime: parseFloat(data.distanceFromCrime.toString()),
        facialExpression: dominantEmotion,
        predictionScore: score,
        status: score < 33 ? 'LOW_RISK' : score < 66 ? 'MEDIUM_RISK' : 'HIGH_RISK'
      }

      try {
        const response = await axios.post('/api/predictions', predictionData)

        console.log('Prediction saved:', response.data)
        setPredictionResult({ ...predictionData, expressionData })
        setDialogOpen(true)
      } catch (error) {
        console.error('Error saving prediction:', error)
        setSnackbarMessage('Error saving prediction. Please try again.')
        setSnackbarOpen(true)
      }
    }
  }

  useEffect(() => {
    if (dialogOpen) {
      const timer = setTimeout(() => {
        setDialogOpen(false)
        router.push('/admin/prediction') // Redirect to predictions page
      }, 5000) // 5 seconds delay

      return () => clearTimeout(timer)
    }
  }, [dialogOpen, router])

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Suspect Prediction
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name='caseId'
                control={control}
                render={({ field }) => (
                  <Select {...field} fullWidth label='Select Case'>
                    {cases?.map((caseItem: any) => (
                      <MenuItem key={caseItem.id} value={caseItem.id}>
                        {caseItem.caseName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Suspect Image</Typography>
              <CloudinaryUpload onUpload={handleImageUpload} onReset={handleImageReset} publicId={uploadedImageId} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='logicalScore'
                control={control}
                defaultValue={50}
                render={({ field }) => (
                  <Box>
                    <Typography>Logical Score</Typography>
                    <Slider {...field} min={0} max={100} valueLabelDisplay='auto' />
                  </Box>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='physicalScore'
                control={control}
                defaultValue={50}
                render={({ field }) => (
                  <Box>
                    <Typography>Physical Score</Typography>
                    <Slider {...field} min={0} max={100} valueLabelDisplay='auto' />
                  </Box>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='distanceFromCrime'
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField {...field} fullWidth label='Distance from Crime Scene (km)' type='number' />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit'>
                Calculate Prediction
              </Button>
            </Grid>
          </Grid>
        </form>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Prediction Result</DialogTitle>
          <DialogContent>
            {predictionResult && (
              <>
                <Typography>Dominant Facial Expression: {predictionResult.facialExpression}</Typography>
                <Typography>Likelihood of Involvement: {predictionResult.predictionScore.toFixed(2)}%</Typography>
                <Typography>Expression Confidences:</Typography>
                {Object.entries(predictionResult.expressionData.predictions).map(([emotion, data]: [string, any]) => (
                  <Typography key={emotion}>
                    {emotion}: {(data.confidence * 100).toFixed(2)}%
                  </Typography>
                ))}
              </>
            )}
            <Typography>Redirecting to predictions page in 5 seconds...</Typography>
          </DialogContent>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </CardContent>
    </Card>
  )
}

export default PredictionPage
