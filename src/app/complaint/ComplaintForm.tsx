'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { TextField, Button, Typography, Container, Box } from '@mui/material'

interface ComplaintFormData {
  title: string
  description: string
}

const ComplaintForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ComplaintFormData>()

  const onSubmit = async (data: ComplaintFormData) => {
    try {
      await axios.post('/api/complaints', data)
      reset()
      alert('Complaint submitted successfully')
    } catch (error) {
      console.error('Error submitting complaint:', error)
      alert('Error submitting complaint')
    }
  }

  return (
    <Container maxWidth='sm' style={{ marginTop: '20px' }}>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete='off'
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant='h4' align='center' gutterBottom>
          Submit a Complaint
        </Typography>
        <TextField {...register('title')} label='Title' variant='outlined' required />
        <TextField {...register('description')} label='Description' variant='outlined' required multiline rows={4} />
        <Button type='submit' variant='contained' color='primary' size='large' style={{ marginTop: '20px' }}>
          Submit Complaint
        </Button>
      </Box>
    </Container>
  )
}

export default ComplaintForm
