'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button, Grid, TextField, Typography, Card, CardContent } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import axios from 'axios'

import { caseSchema } from '@/app/ValidationSchemas'

import Form from '@components/Form'

type CasesFormData = z.infer<typeof caseSchema>

import Spinner from '@/components/Spinner'
import type { Case } from './CasesTable'

interface EditModalContentProps {
  caseItem: Case
  onClose: () => void
}

const EditModalContent = ({ caseItem: cases, onClose }: EditModalContentProps) => {
  const updateCases = async (data: CasesFormData) => {
    await axios.patch(`/api/cases/${cases.id}`, data)
  }

  const queryClient = useQueryClient()

  const router = useRouter()
  const [error, setError] = useState('')

  const {
    handleSubmit,
    control,
    formState: { isDirty }
  } = useForm<CasesFormData>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      caseName: cases.caseName,
      Description: cases.Description,
      status: cases.status
    }
  })

  const editCasesMutation = useMutation({
    mutationFn: updateCases,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] })
      router.refresh()
      onClose()
    },
    onError: () => {
      setError('An unexpected error occurred. Please try again.')
    }
  })

  const onSubmit = async (data: CasesFormData) => {
    if (!isDirty) {
      onClose()

      return
    }

    editCasesMutation.mutate(data)
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardContent>
        <Typography variant='h5' component='h2' gutterBottom>
          Edit Case
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
            <Grid item xs={12} container spacing={2} justifyContent='flex-end'>
              <Grid item>
                <Button variant='outlined' onClick={onClose} disabled={editCasesMutation.status === 'pending'}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' type='submit' disabled={editCasesMutation.status === 'pending' || !isDirty}>
                  {editCasesMutation.status === 'pending' ? 'Saving Changes' : 'Save Changes'}
                  {editCasesMutation.status === 'pending' && <Spinner />}
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
