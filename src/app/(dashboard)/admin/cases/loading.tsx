'use client'

// MUI Imports

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// Components Imports

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

const LoadingCasesTable = () => {
  const cases = [1, 2, 3, 4, 5]

  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </tr>
          </thead>
          <tbody>
            {cases?.map((caseItem, index) => (
              <tr key={index}>
                <td className='!plb-1'>
                  <Skeleton circle={true} height={34} width={34} />
                  <Skeleton circle={true} height={34} width={34} />
                  <Skeleton circle={true} height={34} width={34} />
                </td>
                <td className='!plb-1'>
                  <div className='flex flex-col'>
                    <Typography>
                      <Skeleton />
                    </Typography>
                    <Typography variant='body2' noWrap sx={{ maxWidth: 150 }}>
                      <Skeleton />
                    </Typography>
                  </div>
                </td>
                <td className='!plb-1'>
                  <div className='flex items-center h-[44px]'>
                    <Typography color='text.primary' variant='body2' className='max-w-[230px] h-[40px] overflow-hidden'>
                      <Skeleton />
                    </Typography>
                  </div>
                </td>
                <td className='!pb-1'>
                  <Skeleton circle={true} height={34} width={34} />
                </td>
                <td className='!pb-1'>
                  <div className='flex space-x-1'>
                    <Skeleton />
                    <Skeleton />
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

export default LoadingCasesTable
