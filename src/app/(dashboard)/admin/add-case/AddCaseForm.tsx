'use client'

import React, { useState, useEffect } from 'react'

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

interface Officer {
  officerId: string
  name: string
  email: string
}

const AddCaseForm = () => {
  const [officers, setOfficers] = useState<Officer[]>([])

  const router = useRouter()

  const { control, handleSubmit, setValue, watch, setError, clearErrors } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema)
  })

  const officerId = watch('officerId')

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await axios.get<Officer[]>('/api/officers')

        setOfficers(response.data)
      } catch (error) {
        console.error('Error fetching officers:', error)
      }
    }

    fetchOfficers()
  }, [])

  useEffect(() => {
    if (officerId) {
      const selectedOfficer = officers.find(officer => officer.officerId === officerId)

      if (selectedOfficer) {
        setValue('officerName', selectedOfficer.name)
        clearErrors('officerId')
      } else {
        setValue('officerName', '')
        setError('officerId', {
          type: 'manual',
          message: 'Invalid Officer ID'
        })
      }
    } else {
      setValue('officerName', '')
    }
  }, [officerId, officers, setValue, setError, clearErrors])

  const onSubmit = async (data: CaseFormData) => {
    try {
      await axios.post('/api/cases', {
        caseId: data.caseId,
        caseName: data.caseName,
        officerId: data.officerId,
        officerName: data.officerName, // Include this for validation, even though it's not stored
        message: data.message
      })
      router.push('/admin')

      router.refresh()
    } catch (error) {
      // Handle error
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
                placeholder='Shooting'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='caseId'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                type='text'
                label='Case Id'
                placeholder='436745'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='officerId'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                options={officers.map(officer => officer.officerId)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Officer Id'
                    placeholder='234678'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
                onInputChange={(_, newInputValue) => {
                  field.onChange(newInputValue)
                }}
                freeSolo
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='officerName'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                placeholder='Jane Doe'
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  readOnly: true
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='message'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                rows={4}
                multiline
                label='Message'
                placeholder='The case occurred in Accra central area...'
                error={!!error}
                helperText={error?.message}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
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
