'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import CustomAvatar from '@core/components/mui/Avatar'
import DeleteOfficerButton from './DeleteOfficerButton'
import EditOfficerButton from './EditOfficerButton'
import tableStyles from '@core/styles/table.module.css'
import LoadingOfficersPage from './loading'

export type Officer = {
  id: string
  name: string
  phone: string
  address: string
  picture: string | null
  user: {
    email: string
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  }
}

const fetchOfficers = async () => {
  const response = await axios.get('/api/officers')

  return response.data
}

const deleteOfficer = async (id: string): Promise<void> => {
  await axios.delete(`/api/officers/${id}`)
}

const OfficersTable = () => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const queryClient = useQueryClient()

  const {
    data: officers,
    isError,
    isLoading,
    error
  } = useQuery<Officer[], Error>({ queryKey: ['officers'], queryFn: fetchOfficers })

  const getCloudinaryUrl = (publicId: string) => {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`
  }

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteOfficer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['officers'] })
    }
  })

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  if (isLoading) return <LoadingOfficersPage />
  if (isError) return <div>Error: {error?.message}</div>

  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Officer Information</th>
              <th>Contact Details</th>
              <th>Status</th>
              <th>Actions For Officers</th>
            </tr>
          </thead>
          <tbody>
            {officers?.map(officer => (
              <tr key={officer.id}>
                <td>
                  <div className='flex items-center gap-3'>
                    <CustomAvatar src={officer.picture ? getCloudinaryUrl(officer.picture) : undefined} size={34} />
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        {officer.name}
                      </Typography>
                      <Typography variant='body2'>{officer.user.email}</Typography>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='flex flex-col'>
                    <Typography>{officer.phone}</Typography>
                    <Typography variant='body2'>{officer.address}</Typography>
                  </div>
                </td>
                <td>
                  <Chip
                    className='capitalize'
                    variant='tonal'
                    color={
                      officer.user.status === 'ACTIVE'
                        ? 'success'
                        : officer.user.status === 'INACTIVE'
                          ? 'secondary'
                          : 'error'
                    }
                    label={officer.user.status.toLowerCase()}
                    size='small'
                  />
                </td>
                <td>
                  <div className='flex space-x-1'>
                    <EditOfficerButton officer={officer} />
                    <DeleteOfficerButton onDelete={handleDelete} officer={officer} />
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

export default OfficersTable
