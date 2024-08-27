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

export type Evidence = {
  id: string
  evidenceId: string
  caseNumber: string
  evidenceType: 'PHYSICAL' | 'DIGITAL' | 'DOCUMENTARY' | 'TESTIMONIAL'
  description: string
  collectionDate: string
  collectionLocation: string
  collectedBy: string
  chainOfCustody: {
    date: string
    handledBy: string
    action: string
  }[]
  storageLocation: string
  notes?: string
  EvidenceImage: { publicId: string }[]
}

const fetchEvidence = async () => {
  const response = await axios.get<Evidence[]>('/api/evidence')

  return response.data
}

const EvidenceTable = () => {
  const { data: evidenceList } = useQuery<Evidence[], Error>({ queryKey: ['evidence'], queryFn: fetchEvidence })

  const getEvidenceTypeColor = (type: Evidence['evidenceType']) => {
    switch (type) {
      case 'PHYSICAL':
        return 'primary'
      case 'DIGITAL':
        return 'info'
      case 'DOCUMENTARY':
        return 'warning'
      case 'TESTIMONIAL':
        return 'success'
      default:
        return 'default'
    }
  }

  return (
    <Card>
      <div className='overflow-x-auto'>
        {evidenceList?.map((evidence, index) => (
          <div key={index} className='p-4 border-b last:border-b-0'>
            <div className='flex items-center gap-4'>
              <Tooltip title={evidence.evidenceId}>
                <CustomAvatar
                  src={evidence.EvidenceImage[0] ? getCloudinaryUrl(evidence.EvidenceImage[0].publicId) : undefined}
                  size={60}
                />
              </Tooltip>
              <div>
                <Typography variant='h6'>Evidence ID: {evidence.evidenceId}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Case Number: {evidence.caseNumber} | Collected:{' '}
                  {new Date(evidence.collectionDate).toLocaleDateString()}
                </Typography>
              </div>
            </div>
            <div className='mt-2'>
              <Tooltip title={evidence.description}>
                <Typography variant='body2' noWrap>
                  <strong>Description:</strong> {evidence.description}
                </Typography>
              </Tooltip>
              <Typography variant='body2'>
                <strong>Location:</strong> {evidence.collectionLocation} | <strong>Collected By:</strong>{' '}
                {evidence.collectedBy}
              </Typography>
              <Tooltip title={evidence.storageLocation}>
                <Typography variant='body2' noWrap>
                  <strong>Storage Location:</strong> {evidence.storageLocation}
                </Typography>
              </Tooltip>
            </div>
            <div className='mt-2'>
              <Chip
                className='capitalize'
                variant='tonal'
                color={getEvidenceTypeColor(evidence.evidenceType)}
                label={evidence.evidenceType.toLowerCase()}
                size='small'
              />
            </div>
            {evidence.notes && (
              <div className='mt-2'>
                <Typography variant='body2'>
                  <strong>Notes:</strong> {evidence.notes}
                </Typography>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

export default EvidenceTable
