'use client'

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Container, Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material'

interface AnnouncementFormData {
  title: string
  content: string
}

const AnnouncementForm: React.FC = () => {
  const { data: session } = useSession()
  const { register, handleSubmit, reset } = useForm<AnnouncementFormData>()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

  if (session?.user.role !== 'ADMIN') {
    return (
      <Typography variant='h6' color='error'>
        Unauthorized Access
      </Typography>
    )
  }

  const onSubmit = async (data: AnnouncementFormData) => {
    try {
      await axios.post('/api/announcements', data)
      reset()
      setSnackbarMessage('Announcement created successfully')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)
    } catch (error) {
      console.error('Error creating announcement:', error)
      setSnackbarMessage('Error creating announcement')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 1 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Create Announcement
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 2 }}>
            <TextField {...register('title')} label='Title' variant='outlined' fullWidth required />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              {...register('content')}
              label='Content'
              variant='outlined'
              fullWidth
              required
              multiline
              rows={4}
            />
          </Box>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Create Announcement
          </Button>
        </form>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default AnnouncementForm

// 'use client'

// import React from 'react'

// import { useForm } from 'react-hook-form'
// import axios from 'axios'
// import { useSession } from 'next-auth/react'

// interface AnnouncementFormData {
//   title: string
//   content: string
// }

// const AnnouncementForm: React.FC = () => {
//   const { data: session } = useSession()
//   const { register, handleSubmit, reset } = useForm<AnnouncementFormData>()

//   if (session?.user.role !== 'ADMIN') {
//     return null // Or return an "Unauthorized" message
//   }

//   const onSubmit = async (data: AnnouncementFormData) => {
//     try {
//       await axios.post('/api/announcements', data)
//       reset()
//       alert('Announcement created successfully')
//     } catch (error) {
//       console.error('Error creating announcement:', error)
//       alert('Error creating announcement')
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register('title')} placeholder='Title' required />
//       <textarea {...register('content')} placeholder='Content' required />
//       <button type='submit'>Create Announcement</button>
//     </form>
//   )
// }

// export default AnnouncementForm

// // components/AnnouncementForm.tsx
// import React from 'react'

// import { useForm } from 'react-hook-form'
// import axios from 'axios'

// interface AnnouncementFormData {
//   title: string
//   content: string
// }

// const AnnouncementForm: React.FC = () => {
//   const { register, handleSubmit, reset } = useForm<AnnouncementFormData>()

//   const onSubmit = async (data: AnnouncementFormData) => {
//     try {
//       await axios.post('/api/announcements', data)
//       reset()
//       alert('Announcement created successfully')
//     } catch (error) {
//       console.error('Error creating announcement:', error)
//       alert('Error creating announcement')
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register('title')} placeholder='Title' required />
//       <textarea {...register('content')} placeholder='Content' required />
//       <button type='submit'>Create Announcement</button>
//     </form>
//   )
// }

// export default AnnouncementForm
