'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Image from 'next/image'

import { signIn } from 'next-auth/react'
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  Typography,
  Box,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('NORMAL_USER')
  const [officerId, setOfficerId] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      userType,
      officerId: userType === 'OFFICER' ? officerId : undefined
    })

    if (result?.error) {
      console.error(result.error)
    } else {
      switch (userType) {
        case 'ADMIN':
          router.push('/admin')
          break
        case 'OFFICER':
          router.push('/officer')
          break
        default:
          router.push('/')
      }
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
        <Image src='/images/logos/mlogo.png' alt='Your Company' width={40} height={40} style={{ margin: '0 auto' }} />
        <Typography variant='h4' component='h2' gutterBottom sx={{ mt: 3, mb: 5, fontWeight: 'bold' }}>
          Sign in to your account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth variant='outlined'>
                <TextField
                  select
                  label='User Type'
                  value={userType}
                  onChange={e => setUserType(e.target.value)}
                  variant='outlined'
                  InputLabelProps={{ shrink: true }} // Optional, to keep the label aligned properly
                  InputProps={{
                    style: { textAlign: 'left' } // Ensuring the input text is aligned to the start
                  }}
                >
                  <MenuItem value='NORMAL_USER' style={{ textAlign: 'left' }}>
                    Normal User
                  </MenuItem>
                  <MenuItem value='ADMIN' style={{ textAlign: 'left' }}>
                    Admin
                  </MenuItem>
                  <MenuItem value='OFFICER' style={{ textAlign: 'left' }}>
                    Officer
                  </MenuItem>
                </TextField>
              </FormControl>
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
            {userType === 'OFFICER' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Officer ID'
                  value={officerId}
                  onChange={e => setOfficerId(e.target.value)}
                  required
                  variant='outlined'
                />
              </Grid>
            )}
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
                Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant='body2' sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}>
          A new user?{' '}
          <Link href='/auth/register' underline='hover' sx={{ color: '#4f46e5', fontWeight: 'medium' }}>
            SignUp
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

// 'use client'
// import { useState } from 'react'

// import { useRouter } from 'next/navigation'

// import { signIn } from 'next-auth/react'

// export default function SignIn() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [userType, setUserType] = useState('NORMAL_USER')
//   const [officerId, setOfficerId] = useState('')
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const result = await signIn('credentials', {
//       redirect: false,
//       email,
//       password,
//       userType,
//       officerId: userType === 'OFFICER' ? officerId : undefined
//     })

//     if (result?.error) {
//       // Handle error
//       console.error(result.error)
//     } else {
//       // Redirect based on user type
//       switch (userType) {
//         case 'ADMIN':
//           router.push('/admin/dashboard')
//           break
//         case 'OFFICER':
//           router.push('/officer/dashboard')
//           break
//         default:
//           router.push('/dashboard')
//       }
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' required />
//       <input
//         type='password'
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder='Password'
//         required
//       />
//       <select value={userType} onChange={e => setUserType(e.target.value)}>
//         <option value='NORMAL_USER'>Normal User</option>
//         <option value='ADMIN'>Admin</option>
//         <option value='OFFICER'>Officer</option>
//       </select>
//       {userType === 'OFFICER' && (
//         <input
//           type='text'
//           value={officerId}
//           onChange={e => setOfficerId(e.target.value)}
//           placeholder='Officer ID'
//           required
//         />
//       )}
//       <button type='submit'>Sign In</button>
//     </form>
//   )
// }
