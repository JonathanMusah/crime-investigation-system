'use client'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Form from '@components/Form'
import { caseOfficerSchema } from '@/app/ValidationSchemas'

type CaseOfficerFormData = z.infer<typeof caseOfficerSchema>

interface Case {
  id: string
  caseId: string
  caseName: string
}

interface Officer {
  id: string
  officerId: string
  name: string
}

const AddCaseOfficerForm = () => {
  const [cases, setCases] = useState<Case[]>([])
  const [officers, setOfficers] = useState<Officer[]>([])
  const [error, setError] = useState('')

  const { control, handleSubmit } = useForm<CaseOfficerFormData>({
    resolver: zodResolver(caseOfficerSchema)
  })

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casesResponse, officersResponse] = await Promise.all([
          axios.get<Case[]>('/api/cases'),
          axios.get<Officer[]>('/api/officers')
        ])

        setCases(casesResponse.data)
        setOfficers(officersResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load cases and officers')
      }
    }

    fetchData()
  }, [])

  const onSubmit: SubmitHandler<CaseOfficerFormData> = async data => {
    try {
      await axios.post('/api/caseofficer', data)
      router.push('/admin/cases')
      router.refresh()
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('An error occurred while assigning the officer to the case')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        {error && (
          <Grid item xs={12}>
            <p className='text-red-500'>{error}</p>
          </Grid>
        )}

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
          <Controller
            name='officerId'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                options={officers}
                getOptionLabel={(option: Officer) => `${option.officerId} - ${option.name}`}
                renderInput={params => (
                  <TextField {...params} label='Select Officer' error={!!error} helperText={error?.message} />
                )}
                onChange={(_, data) => field.onChange(data?.id)}
                value={officers.find(o => o.id === field.value) || null}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant='contained' type='submit'>
            Assign Officer to Case
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}

export default AddCaseOfficerForm
