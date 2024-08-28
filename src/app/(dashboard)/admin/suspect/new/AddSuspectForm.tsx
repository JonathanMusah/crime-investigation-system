'use client'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type * as z from 'zod'
import {
  Button,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Autocomplete,
  Box,
  InputLabel,
  FormControl
} from '@mui/material'

import axios, { isAxiosError } from 'axios'

import CloudinaryUpload from '@/components/CloudinaryUpload'
import { suspectSchema } from '@/app/ValidationSchemas'

type SuspectFormData = z.infer<typeof suspectSchema>

interface Case {
  id: string
  caseId: string
  caseName: string
}

const AddSuspectForm = () => {
  const router = useRouter()
  const [publicId, setPublicId] = useState('')
  const [error, setError] = useState('')
  const [cases, setCases] = useState<Case[]>([])

  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  //   watch
  // } = useForm<SuspectFormData>({
  //   resolver: zodResolver(suspectSchema)
  // })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<SuspectFormData>({
    resolver: zodResolver(suspectSchema),
    defaultValues: {
      associates: [],
      socialMedia: [],
      alibi: { description: '', location: '' },
      hasDistinctiveFeatures: false,
      hasCriminalHistory: false

      // Add other default values for required fields
    }
  })

  console.log('Form errors:', errors)

  const {
    fields: associateFields,
    append: appendAssociate,
    remove: removeAssociate
  } = useFieldArray({
    control,
    name: 'associates'
  })

  const {
    fields: socialMediaFields,
    append: appendSocialMedia,
    remove: removeSocialMedia
  } = useFieldArray({
    control,
    name: 'socialMedia'
  })

  const hasDistinctiveFeatures = watch('hasDistinctiveFeatures')
  const hasCriminalHistory = watch('hasCriminalHistory')

  const handleUpload = (uploadedPublicId: string) => {
    setPublicId(uploadedPublicId)
    setValue('picture', uploadedPublicId)
  }

  const handleReset = () => {
    setPublicId('')
    setValue('picture', '')
  }

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get<Case[]>('/api/cases')

        setCases(response.data)
      } catch (error) {
        console.error('Error fetching cases:', error)
        setError('Failed to load cases')
      }
    }

    fetchCases()
  }, [])

  // const onSubmit = async (data: SuspectFormData) => {
  //   console.log('Form submitted', data)

  //   try {
  //     const { caseId, ...suspectData } = data

  //     await axios.post('/api/suspect', suspectData, {
  //       params: { caseId }
  //     })
  //     router.push('/suspect')
  //     router.refresh()
  //   } catch (error) {
  //     setError('An unexpected Error Occurred')
  //   }
  // }

  // const onSubmit = (data: SuspectFormData) => {
  //   console.log('Form submitted', data)
  // }

  const onSubmit = async (data: SuspectFormData) => {
    console.log('Form submitted', data)

    try {
      // const { caseId, ...suspectData } = data
      // suspectData, {
      //   params: { caseId }
      // }

      const response = await axios.post('/api/suspect', data)

      console.log('API Response:', response.data)
      router.push('/admin/suspect')
      router.refresh()
    } catch (error) {
      if (isAxiosError(error)) {
        console.error('Axios error:', error.response?.data)
        setError(error.response?.data?.message || 'An unexpected error occurred')
      } else {
        console.error('Unknown error:', error)
        setError('An unexpected error occurred')
      }
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Validation errors:', errors)
    }
  }, [errors])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {error && <Typography color='error'>{error}</Typography>} */}
      {error && <Typography color='error'>{error}</Typography>}
      {Object.keys(errors).length > 0 && <Typography color='error'>Please correct the highlighted fields</Typography>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Name'
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Date of Birth'
            type='date'
            InputLabelProps={{ shrink: true }}
            {...register('dateOfBirth')}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Gender'
            {...register('gender')}
            error={!!errors.gender}
            helperText={errors.gender?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={countries}
            renderInput={params => <TextField {...params} label='Nationality' />}
            onChange={(_, value) => setValue('nationality', value?.label || '')}
            isOptionEqualToValue={(option, value) => option?.label === value?.label}
          />
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Address'
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Phone Number'
            {...register('phoneNumber')}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Email'
            type='email'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        {/* Physical Characteristics */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Height'
            {...register('height')}
            error={!!errors.height}
            helperText={errors.height?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Weight'
            {...register('weight')}
            error={!!errors.weight}
            helperText={errors.weight?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox {...register('hasDistinctiveFeatures')} />}
            label='Has Distinctive Features'
          />
        </Grid>
        {hasDistinctiveFeatures && (
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label='Distinctive Features' {...register('distinctiveFeatures')} />
          </Grid>
        )}

        {/* Biographical Information */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Occupation'
            {...register('occupation')}
            error={!!errors.occupation}
            helperText={errors.occupation?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Education'
            {...register('education')}
            error={!!errors.education}
            helperText={errors.education?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id='marital-status-label'>Marital Status</InputLabel>
            <Controller
              name='maritalStatus'
              control={control}
              render={({ field }) => (
                <Select {...field} labelId='marital-status-label' label='Marital Status'>
                  <MenuItem value='Single'>Single</MenuItem>
                  <MenuItem value='Married'>Married</MenuItem>
                  <MenuItem value='Divorced'>Divorced</MenuItem>
                  <MenuItem value='Widowed'>Widowed</MenuItem>
                  <MenuItem value='Other'>Other</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label='Dependents' {...register('dependents')} />
        </Grid>

        {/* Criminal History */}
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox {...register('hasCriminalHistory')} />} label='Has Criminal History' />
        </Grid>
        {hasCriminalHistory && (
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label='Criminal History' {...register('criminalHistory')} />
          </Grid>
        )}

        {/* Social Connections */}
        {associateFields.map((field, index) => (
          <Grid item xs={12} key={field.id}>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel id={`associate-type-label-${index}`}>Associate Type</InputLabel>
                <Select
                  {...register(`associates.${index}.type`)}
                  labelId={`associate-type-label-${index}`}
                  label='Associate Type'
                >
                  <MenuItem value='Family'>Family</MenuItem>
                  <MenuItem value='Friend'>Friend</MenuItem>
                  <MenuItem value='Co-worker'>Co-worker</MenuItem>
                  <MenuItem value='Neighbor'>Neighbor</MenuItem>
                  <MenuItem value='Other'>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {watch(`associates.${index}.type`) === 'Family' && (
              <Box mb={2}>
                <TextField {...register(`associates.${index}.relation`)} fullWidth label='Relation' />
              </Box>
            )}
            <Box mb={2}>
              <TextField {...register(`associates.${index}.name`)} fullWidth label='Name' />
            </Box>
            <Button variant='outlined' color='secondary' onClick={() => removeAssociate(index)}>
              Remove Associate
            </Button>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={() => appendAssociate({ type: 'Family', name: '' })}>
            Add Associate
          </Button>
        </Grid>

        {/* {socialMediaFields.map((field, index) => (
          <Grid item xs={12} key={field.id}>
            <Box mb={2}>
              <Controller
                name={`socialMedia.${index}.platform`}
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'Other']}
                    renderInput={params => <TextField {...params} label='Social Media Platform' />}
                    onChange={(_, value) => field.onChange(value)}
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <TextField {...register(`socialMedia.${index}.username`)} fullWidth label='Username/Profile Link' />
            </Box>
            <Button variant='outlined' color='secondary' onClick={() => removeSocialMedia(index)}>
              Remove Social Media
            </Button>
          </Grid>
        ))} */}
        {socialMediaFields.map((field, index) => (
          <Grid item xs={12} key={field.id}>
            <Box mb={2}>
              <Controller
                name={`socialMedia.${index}.platform`}
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'Other']}
                    renderInput={params => <TextField {...params} label='Social Media Platform' />}
                    onChange={(_, value) => field.onChange(value)}
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <TextField {...register(`socialMedia.${index}.username`)} fullWidth label='Username/Profile Link' />
            </Box>
            <Button variant='outlined' color='secondary' onClick={() => removeSocialMedia(index)}>
              Remove Social Media
            </Button>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={() => appendSocialMedia({ platform: '', username: '' })}>
            Add Social Media
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label='ID Numbers' {...register('idNumbers')} />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label='Relationship to Incident' {...register('relationshipToIncident')} />
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <TextField {...register('alibi.description')} fullWidth label='Alibi Description' />
          </Box>
          <TextField {...register('alibi.location')} fullWidth label='Alibi Location' />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth multiline rows={3} label='Comments' {...register('comments')} />
        </Grid>
        <Grid item xs={12}>
          <TextField {...register('socialMediaProfiles')} fullWidth label='Social Media Profiles' />
        </Grid>
        <Grid item xs={12}>
          <TextField {...register('alibisAndWitnesses')} fullWidth label='Alibis and Witnesses' />
        </Grid>

        {/* Picture Upload */}
        <Grid item xs={12}>
          <CloudinaryUpload onUpload={handleUpload} publicId={publicId} onReset={handleReset} />
          <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          {errors.picture && <Typography color='error'>{errors.picture.message}</Typography>}
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddSuspectForm

const countries = [
  { label: 'United States' },
  { label: 'United Kingdom' }

  // ... add more countries
]
