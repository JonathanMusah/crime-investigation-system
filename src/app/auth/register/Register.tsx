'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Box, Grid, TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   // Reset the error message
  //   setError('')

  //   const response = await fetch('/api/auth/register', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name, email, password })
  //   })

  //   if (response.ok) {
  //     router.push('/auth/signin')
  //   } else {
  //     const error = await response.text()

  //     setError(error)
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    if (response.ok) {
      router.push('/auth/signin')
    } else {
      // Handle error
      const error = await response.text()

      console.error(error)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          mx: 'auto',
          p: 4,
          backgroundColor: 'white',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant='h4' component='h2' gutterBottom sx={{ fontWeight: 'bold' }}>
          Create your account
        </Typography>
        {error && (
          <Typography variant='body2' sx={{ color: 'red', mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Name'
                value={name}
                onChange={e => setName(e.target.value)}
                required
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label='Email address'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                variant='outlined'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: '#4f46e5',
                  '&:hover': {
                    backgroundColor: '#4338ca'
                  },
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}

// 'use client'
// import { useState } from 'react'

// import { useRouter } from 'next/navigation'

// export default function Register() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const response = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password })
//     })

//     if (response.ok) {
//       router.push('/auth/signin')
//     } else {
//       // Handle error
//       const error = await response.text()

//       console.error(error)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Name' required />
//       <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' required />
//       <input
//         type='password'
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder='Password'
//         required
//       />
//       <button type='submit'>Register</button>
//     </form>
//   )
// }
