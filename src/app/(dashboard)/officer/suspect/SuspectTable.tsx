'use client'

import { useQuery } from '@tanstack/react-query'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { Tooltip } from '@mui/material'
import axios from 'axios'

import CustomAvatar from '@core/components/mui/Avatar'

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

const getCloudinaryUrl = (publicId: string) => {
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`
}

export type Suspect = {
  id: string
  name: string
  dateOfBirth: string
  gender: string
  nationality: string
  address: string
  phoneNumber: string
  email: string
  picture: string
  relationshipToIncident: string
  status?: 'PERSON_OF_INTEREST' | 'SUSPECT' | 'CLEARED' | 'ARRESTED'
}

const fetchSuspects = async () => {
  const response = await axios.get<Suspect[]>('/api/suspect')

  return response.data
}

const SuspectsTable = () => {
  const { data: suspects } = useQuery<Suspect[], Error>({ queryKey: ['suspects'], queryFn: fetchSuspects })

  const getStatusColor = (status?: Suspect['status']) => {
    switch (status) {
      case 'PERSON_OF_INTEREST':
        return 'info'
      case 'SUSPECT':
        return 'warning'
      case 'CLEARED':
        return 'success'
      case 'ARRESTED':
        return 'error'
      default:
        return 'default'
    }
  }

  const formatStatus = (status?: string) => {
    return status ? status.toLowerCase().replace('_', ' ') : 'Unknown'
  }

  return (
    <Card>
      <div className='overflow-x-auto'>
        {suspects?.map((suspect, index) => (
          <div key={index} className='p-4 border-b last:border-b-0'>
            <div className='flex items-center gap-4'>
              <Tooltip title={suspect.name}>
                <CustomAvatar src={suspect.picture ? getCloudinaryUrl(suspect.picture) : undefined} size={60} />
              </Tooltip>
              <div>
                <Typography variant='h6'>{suspect.name}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  {suspect.dateOfBirth} | {suspect.gender} | {suspect.nationality}
                </Typography>
              </div>
            </div>
            <div className='mt-2'>
              <Tooltip title={suspect.address}>
                <Typography variant='body2' noWrap>
                  <strong>Address:</strong> {suspect.address}
                </Typography>
              </Tooltip>
              <Typography variant='body2'>
                <strong>Contact:</strong> {suspect.phoneNumber} | {suspect.email}
              </Typography>
              <Tooltip title={suspect.relationshipToIncident}>
                <Typography variant='body2' noWrap>
                  <strong>Relationship to Incident:</strong> {suspect.relationshipToIncident}
                </Typography>
              </Tooltip>
            </div>
            <div className='mt-2'>
              <Chip
                className='capitalize'
                variant='tonal'
                color={getStatusColor(suspect.status)}
                label={formatStatus(suspect.status)}
                size='small'
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default SuspectsTable
