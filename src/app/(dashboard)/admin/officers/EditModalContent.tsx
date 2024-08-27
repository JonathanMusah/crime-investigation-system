'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button, Grid, TextField, Typography, Card, CardContent } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import axios from 'axios'

import { officerSchema, userSchema } from '@/app/ValidationSchemas'
import CloudinaryUpload from '@/components/CloudinaryUpload'
import Form from '@components/Form'

type OfficerFormData = z.infer<typeof officerSchema> & z.infer<typeof userSchema>

import type { Officer } from './OfficersTable'
import Spinner from '@/components/Spinner'

interface EditModalContentProps {
  officer: Officer
  onClose: () => void
}

const EditModalContent: React.FC<EditModalContentProps> = ({ officer, onClose }) => {
  const updateOfficer = async (data: OfficerFormData) => {
    await axios.patch(`/api/officers/${officer.id}`, data)
  }

  const queryClient = useQueryClient()

  const router = useRouter()
  const [publicId, setPublicId] = useState(officer.picture || '')
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue
  } = useForm<OfficerFormData>({
    resolver: zodResolver(officerSchema.merge(userSchema.omit({ role: true }))),
    defaultValues: {
      caseName: officer.name,
      description: officer.user.email,
      status: officer.phone,
      address: officer.address,
      picture: officer.picture || ''
    }
  })

  const handleUpload = (uploadedPublicId: string) => {
    setPublicId(uploadedPublicId)
    setValue('picture', uploadedPublicId, { shouldDirty: true })
  }

  const handleReset = () => {
    setPublicId('')
    setValue('picture', '', { shouldDirty: true })
  }

  const editOfficerMutation = useMutation({
    mutationFn: updateOfficer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['officers'] }) // Assuming you have a query key for officers
      router.refresh()
      onClose()
    },
    onError: () => {
      setError('An unexpected error occurred. Please try again.')
    }
  })

  const onSubmit = async (data: OfficerFormData) => {
    if (!isDirty) {
      onClose()

      return
    }

    editOfficerMutation.mutate(data)
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardContent>
        <Typography variant='h5' component='h2' gutterBottom>
          Edit Officer
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {error && (
              <Grid item xs={12}>
                <Typography color='error' sx={{ mb: 2 }}>
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Name'
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                inputProps={{ 'aria-label': 'Officer Name' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                {...register('email')}
                error={!!errors.description}
                helperText={errors.description?.message}
                inputProps={{ 'aria-label': 'Officer Email' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='password'
                label='Password'
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                inputProps={{ 'aria-label': 'Officer Password' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Phone No.'
                {...register('phone')}
                error={!!errors.status}
                helperText={errors.status?.message}
                inputProps={{ 'aria-label': 'Officer Phone Number' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Address'
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message}
                inputProps={{ 'aria-label': 'Officer Address' }}
              />
            </Grid>
            <Grid item xs={12}>
              <CloudinaryUpload onUpload={handleUpload} publicId={publicId} onReset={handleReset} />
              <Typography variant='caption'>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
              {errors.picture && <Typography color='error'>{errors.picture.message}</Typography>}
            </Grid>
            <Grid item xs={12} container spacing={2} justifyContent='flex-end'>
              <Grid item>
                <Button variant='outlined' onClick={onClose} disabled={editOfficerMutation.status === 'pending'}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  type='submit'
                  disabled={editOfficerMutation.status === 'pending' || !isDirty}
                >
                  {editOfficerMutation.status === 'pending' ? 'Saving Changes' : 'Save Changes'}
                  {editOfficerMutation.status === 'pending' && <Spinner />}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EditModalContent
