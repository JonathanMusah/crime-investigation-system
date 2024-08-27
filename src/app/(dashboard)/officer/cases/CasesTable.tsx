'use client'

// MUI Imports
import { useSession } from 'next-auth/react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

// Components Imports
import { Button, Tooltip } from '@mui/material'

import axios from 'axios'

import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import DeleteCaseButton from './DeleteCaseButton'
import EditCaseButton from './EditCaseButton'

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

const getCloudinaryUrl = (publicId: string) => {
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`
}

export type Officer = {
  id: string
  name: string
  email: string
  avatarSrc?: string
}

export type Case = {
  id: string
  caseId: string
  caseName: string
  Description: string
  status: 'ACTIVE' | 'CLOSED' | 'IN_PROGRESS' | 'PENDING'
  officers: Officer[]
}

const fetchCases = async () => {
  const response = await axios.get<Case[]>('/api/cases')

  return response.data
}

const deleteCase = async (id: string): Promise<void> => {
  await axios.delete(`/api/cases/${id}`)
}

const CasesTable = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['officers'] })
    }
  })

  // const { data: cases } = useQuery<Case[], Error>({ queryKey: ['cases'], queryFn: fetchCases })
  const { data: cases, isLoading, error } = useQuery<Case[], Error>({ queryKey: ['cases'], queryFn: fetchCases })

  if (isLoading) {
    return <Typography>Loading cases...</Typography>
  }

  if (error) {
    return <Typography color='error'>Error loading cases: {(error as unknown as Error).message}</Typography>
  }

  if (!cases || cases.length === 0) {
    return <Typography>No cases assigned to you at the moment.</Typography>
  }

  const renderOfficers = (officers: Officer[]) => {
    if (officers.length === 0) {
      return (
        <Typography color='text.secondary' variant='body2'>
          No officers assigned
        </Typography>
      )
    }

    if (officers.length === 1) {
      return (
        <div className='flex items-center gap-3'>
          <CustomAvatar src={officers[0].avatarSrc ? getCloudinaryUrl(officers[0].avatarSrc) : undefined} size={34} />
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {officers[0].name}
            </Typography>
            <Typography variant='body2'>{officers[0].email}</Typography>
          </div>
        </div>
      )
    } else {
      return (
        <Tooltip title={officers.map(o => `${o.name} (${o.email})`).join(', ')}>
          <div className='flex -space-x-2'>
            {officers.slice(0, 3).map((officer, index) => (
              <CustomAvatar
                key={index}
                src={officer.avatarSrc ? getCloudinaryUrl(officer.avatarSrc) : undefined}
                size={34}
              />
            ))}
            {officers.length > 3 && <CustomAvatar size={34}>{`+${officers.length - 3}`}</CustomAvatar>}
          </div>
        </Tooltip>
      )
    }
  }

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'success'
      case 'CLOSED':
        return 'error'
      case 'IN_PROGRESS':
        return 'warning'
      case 'PENDING':
        return 'info'
      default:
        return 'default'
    }
  }

  if (isLoading) {
    return <Typography>Loading cases...</Typography>
  }

  if (error) {
    return <Typography color='error'>Error loading cases: {error.message}</Typography>
  }

  if (!cases || cases.length === 0) {
    return <Typography>No cases assigned to you at the moment.</Typography>
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  const isAdmin = session?.user.role === 'ADMIN'

  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Officers Working On Case</th>
              <th>Case Information</th>
              <th>Summary For Cases</th>
              <th>Status</th>
              <th>Actions For Cases</th>
            </tr>
          </thead>
          <tbody>
            {cases?.map((caseItem, index) => (
              <tr key={index}>
                <td className='!plb-1'>{renderOfficers(caseItem.officers)}</td>
                <td className='!plb-1'>
                  <div className='flex flex-col'>
                    <Typography>{caseItem.caseName}</Typography>
                    <Tooltip title={caseItem.caseId}>
                      <Typography variant='body2' noWrap sx={{ maxWidth: 150 }}>
                        {caseItem.caseId}
                      </Typography>
                    </Tooltip>
                  </div>
                </td>
                <td className='!plb-1'>
                  <div className='flex items-center h-[44px]'>
                    <Typography
                      color='text.primary'
                      variant='body2'
                      className='max-w-[230px] h-[40px] overflow-hidden'
                      title={caseItem.Description}
                    >
                      {caseItem.Description}
                    </Typography>
                  </div>
                </td>
                <td className='!pb-1'>
                  <Chip
                    className='capitalize'
                    variant='tonal'
                    color={getStatusColor(caseItem.status)}
                    label={caseItem.status.toLowerCase().replace('_', ' ')}
                    size='small'
                  />
                </td>
                <td className='!pb-1'>
                  <div className='flex space-x-1'>
                    {isAdmin && (
                      <>
                        <EditCaseButton caseItem={caseItem} />
                        <DeleteCaseButton onDelete={handleDelete} cases={caseItem} />
                      </>
                    )}
                    {/* Add a view button for officers */}
                    {!isAdmin && (
                      <Button variant='outlined' size='small' href={`/officer/cases/${caseItem.id}`}>
                        View
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default CasesTable
