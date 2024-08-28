'use client'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type * as z from 'zod'
import axios, { isAxiosError } from 'axios'
import {
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

// import type { Suspect } from '@prisma/client'

import CloudinaryUpload from '@/components/CloudinaryUpload'
import { evidenceSchema } from '@/app/ValidationSchemas'

type EvidenceFormData = z.infer<typeof evidenceSchema>

interface Case {
  id: string
  caseId: string
  caseName: string
}

interface Suspect {
  id: string
  suspectId: string
  name: string
  dateOfBirth: string
  gender: string
  nationality: string
  address: string
  phoneNumber: string
  email: string
  height: string
  weight: string
  hasDistinctiveFeatures: boolean
  distinctiveFeatures: string
  occupation: string
  education: string
  maritalStatus: string
  children: string
  criminalRecord: string
  updatedAt: Date
}

const AddEvidenceForm = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [cases, setCases] = useState<Case[]>([])
  const [suspects, setSuspects] = useState<Suspect[]>([])
  const [uploadedImage, setUploadedImage] = useState<string>('')

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<EvidenceFormData>({
    resolver: zodResolver(evidenceSchema)
  })

  console.log('Form errors:', errors)

  const handleImageUpload = (publicId: string) => {
    setUploadedImage(publicId)
    setValue('images', [publicId])
  }

  const handleImageReset = () => {
    setUploadedImage('')
    setValue('images', [])
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casesResponse, suspectsResponse] = await Promise.all([
          axios.get<Case[]>('/api/cases'),
          axios.get<Suspect[]>('/api/suspect')
        ])

        setCases(casesResponse.data)
        setSuspects(suspectsResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load data')
      }
    }

    fetchData()
  }, [])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chainOfCustody'
  })

  const onSubmit = async (data: EvidenceFormData) => {
    console.log('Form submitted', data)

    try {
      console.log('Submitting data:', data)
      const response = await axios.post('/api/evidence', data)

      console.log('Response:', response.data)
      router.push('/admin/evidence')
      router.refresh()
    } catch (error) {
      console.error('Error submitting evidence:', error)

      if (isAxiosError(error)) {
        console.error('Axios error:', error.response?.data)
        setError(error.response?.data?.message || 'An unexpected error occurred')
      } else {
        console.error('Unknown error:', error)
        setError('An unexpected error occurred')
      }
    }
  }

  // const onSubmit = async (data: EvidenceFormData) => {
  //   console.log('Form submitted', data)

  //   try {
  //     console.log('Submitting data:', data)
  //     const response = await axios.post('/api/evidence', data)

  //     console.log('Response:', response.data)
  //     router.push('/admin/evidence')
  //     router.refresh()
  //   } catch (error) {
  //     console.error('Error submitting evidence:', error)

  //     if (axios.isAxiosError(error)) {
  //       console.error('Axios error:', error.response?.data)
  //       setError(error.response?.data?.message || 'An unexpected error occurred')
  //     } else {
  //       console.error('Unknown error:', error)
  //       setError('An unexpected error occurred')
  //     }
  //   }
  // }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Controller
              name='caseId'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  options={cases}
                  getOptionLabel={(option: Case) => `${option.caseId} - ${option.caseName}`}
                  renderInput={params => (
                    <TextField {...params} label='Select Case' error={!!error} helperText={error?.message} />
                  )}
                  onChange={(_, data) => field.onChange(data?.id)}
                  value={cases.find(c => c.id === field.value) || null}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Evidence Type</InputLabel>
              <Controller
                name='evidenceType'
                control={control}
                render={({ field }) => (
                  <Select {...field} label='Evidence Type'>
                    <MenuItem value='PHYSICAL'>Physical</MenuItem>
                    <MenuItem value='DIGITAL'>Digital</MenuItem>
                    <MenuItem value='DOCUMENTARY'>Documentary</MenuItem>
                    <MenuItem value='TESTIMONIAL'>Testimonial</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label='Description'
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name='collectionDate'
              control={control}
              render={({ field }) => <DateTimePicker {...field} label='Collection Date & Time' />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Collection Location'
              {...register('collectionLocation')}
              error={!!errors.collectionLocation}
              helperText={errors.collectionLocation?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Collected By'
              {...register('collectedBy')}
              error={!!errors.collectedBy}
              helperText={errors.collectedBy?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>Chain of Custody</Typography>
            {fields.map((field, index) => (
              <Grid container spacing={2} key={field.id}>
                <Grid item xs={12} md={4}>
                  <Controller
                    name={`chainOfCustody.${index}.date`}
                    control={control}
                    render={({ field }) => <DateTimePicker {...field} label='Date & Time' />}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField fullWidth label='Handled By' {...register(`chainOfCustody.${index}.handledBy`)} />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField fullWidth label='Action' {...register(`chainOfCustody.${index}.action`)} />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button onClick={() => remove(index)}>Remove</Button>
                </Grid>
              </Grid>
            ))}
            <Button onClick={() => append({ date: new Date(), handledBy: '', action: '' })}>Add Entry</Button>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='relatedSuspects'
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  options={suspects}
                  getOptionLabel={(option: Suspect) => option.name}
                  renderInput={params => <TextField {...params} label='Related Suspects' />}
                  onChange={(_, value) => field.onChange(value)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  value={(field.value as Suspect[]) || []}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Storage Location'
              {...register('storageLocation')}
              error={!!errors.storageLocation}
              helperText={errors.storageLocation?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label='Notes' {...register('notes')} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Evidence Image</Typography>
            <CloudinaryUpload onUpload={handleImageUpload} onReset={handleImageReset} publicId={uploadedImage} />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' type='submit'>
              Submit Evidence
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  )
}

export default AddEvidenceForm
