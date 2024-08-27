'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import axios from 'axios'

import { caseSchema } from '@/app/ValidationSchemas'

type CaseFormData = z.infer<typeof caseSchema>

// interface Officer {
//   id: string
//   officerId: string
//   name: string
// }

const AddCaseForm = () => {
  // const [officers, setOfficers] = useState<Officer[]>([])
  const router = useRouter()

  const { control, handleSubmit } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      status: 'PENDING'
    }
  })

  // useEffect(() => {
  //   const fetchOfficers = async () => {
  //     try {
  //       const response = await axios.get<Officer[]>('/api/officers')
  //       setOfficers(response.data)
  //     } catch (error) {
  //       console.error('Error fetching officers:', error)
  //     }
  //   }

  //   fetchOfficers()
  // }, [])

  const onSubmit = async (data: CaseFormData) => {
    try {
      await axios.post('/api/cases', {
        caseName: data.caseName,
        Description: data.Description,
        status: data.status
      })
      router.push('/admin/cases')
      router.refresh()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Controller
            name='caseName'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label='Case Name'
                placeholder='Drug Trafficking'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='Description'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label='Description'
                placeholder='The case occurred in Accra central area...'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='status'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                options={['ACTIVE', 'CLOSED', 'IN_PROGRESS', 'PENDING']}
                renderInput={params => (
                  <TextField {...params} label='Status' error={!!error} helperText={error?.message} />
                )}
                onChange={(_, value) => field.onChange(value)}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddCaseForm
