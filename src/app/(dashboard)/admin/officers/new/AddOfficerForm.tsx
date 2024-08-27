'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'

import axios from 'axios'

import { officerSchema, userSchema } from '@/app/ValidationSchemas'
import CloudinaryUpload from '@/components/CloudinaryUpload'
import Form from '@components/Form'

// type OfficerFormData = z.infer<typeof officerSchema> & z.infer<typeof userSchema>
type OfficerFormData = z.infer<typeof officerSchema> & Omit<z.infer<typeof userSchema>, 'role' | 'status'>

const AddOfficerForm = () => {
  const router = useRouter()
  const [publicId, setPublicId] = useState('')
  const [error, setError] = useState('')

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue
  // } = useForm<OfficerFormData>({
  //   resolver: zodResolver(officerSchema.merge(userSchema.omit({ role: true })))
  // })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<OfficerFormData>({
    resolver: zodResolver(officerSchema.merge(userSchema.omit({ role: true, status: true })))
  })

  const handleUpload = (uploadedPublicId: string) => {
    setPublicId(uploadedPublicId)
    setValue('picture', uploadedPublicId)
  }

  const handleReset = () => {
    setPublicId('')
    setValue('picture', '')
  }

  // const onSubmit = async (data: OfficerFormData) => {
  //   try {
  //     await axios.post('/api/officers', data)
  //     router.push('/admin/officers')
  //     router.refresh()
  //   } catch (error) {
  //     setError('An unexpected Error Occurred')
  //   }
  // }

  const onSubmit = async (data: OfficerFormData) => {
    try {
      const submissionData = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        picture: data.picture,
        email: data.email,
        password: data.password
      }

      await axios.post('/api/officers', submissionData)
      router.push('/admin/officers')
      router.refresh()
    } catch (error) {
      setError('An unexpected Error Occurred')
      console.error(error)
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          {/* Left Column */}
          <Grid item xs={12} md={6} className='space-y-10'>
            <TextField
              fullWidth
              label='Name'
              placeholder='John Doe'
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              label='Phone No.'
              placeholder='123-456-7890'
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              fullWidth
              label='Address'
              placeholder='123 Main St'
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='johndoe@gmail.com'
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              type='password'
              label='Password'
              placeholder='********'
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
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
      </Form>
    </div>
  )
}

export default AddOfficerForm
