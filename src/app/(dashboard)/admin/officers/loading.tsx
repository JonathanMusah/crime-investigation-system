import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Skeleton from 'react-loading-skeleton'
import { Box } from '@mui/material'

import 'react-loading-skeleton/dist/skeleton.css' // Ensure this import is present
import tableStyles from '@core/styles/table.module.css'

const LoadingOfficersPage = () => {
  // Mock data to represent loading state
  const officers = [1, 2, 3, 4, 5]

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Box>
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
              {officers.map(officer => (
                <tr key={officer}>
                  <td>
                    <div className='flex items-center gap-3'>
                      <Skeleton circle={true} height={34} width={34} />
                      <div className='flex flex-col'>
                        <Typography color='text.primary' className='font-medium'>
                          <Skeleton width={100} />
                        </Typography>
                        <Typography variant='body2'>
                          <Skeleton width={150} />
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='flex flex-col'>
                      <Typography>
                        <Skeleton width={100} />
                      </Typography>
                      <Typography variant='body2'>
                        <Skeleton width={150} />
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Skeleton width={50} />
                  </td>
                  <td>
                    <div className='flex'>
                      <Skeleton width={80} style={{ marginRight: '8px' }} />
                      <Skeleton width={80} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default LoadingOfficersPage
