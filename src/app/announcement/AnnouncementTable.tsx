'use client'

import React from 'react'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button
} from '@mui/material'

interface Announcement {
  id: string
  title: string
  content: string
  createdAt: string
}

const AnnouncementTable: React.FC = () => {
  const {
    data: announcements,
    isLoading,
    error
  } = useQuery<Announcement[]>({
    queryKey: ['announcements'],
    queryFn: () => axios.get('/api/announcements').then(res => res.data)
  })

  if (isLoading) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
  if (error) return <Alert severity='error'>Error loading announcements</Alert>

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden' }}>
      <Table>
        <TableHead style={{ backgroundColor: '#f0f0f0' }}>
          <TableRow>
            <TableCell>
              <Typography variant='h6' fontWeight='bold'>
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='h6' fontWeight='bold'>
                Created At
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='h6' fontWeight='bold' align='center'>
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {announcements?.map(announcement => (
            <TableRow hover key={announcement.id}>
              <TableCell>{announcement.title}</TableCell>
              <TableCell>{new Date(announcement.createdAt).toLocaleDateString()}</TableCell>
              <TableCell align='center'>
                <Button
                  variant='outlined'
                  color='primary'
                  size='small'
                  component={Link}
                  href={`/announcements/${announcement.id}`}
                >
                  Read More
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AnnouncementTable

// 'use client'

// // components/AnnouncementTable.tsx
// import React from 'react'

// import Link from 'next/link'

// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'

// interface Announcement {
//   id: string
//   title: string
//   content: string
//   createdAt: string
// }

// const AnnouncementTable: React.FC = () => {
//   const {
//     data: announcements,
//     isLoading,
//     error
//   } = useQuery<Announcement[]>({
//     queryKey: ['announcements'], // Wrap the key in an options object
//     queryFn: () => axios.get('/api/announcements').then(res => res.data) // Specify the query function
//   })

//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error loading announcements</div>

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Title</th>
//           <th>Created At</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {announcements?.map(announcement => (
//           <tr key={announcement.id}>
//             <td>{announcement.title}</td>
//             <td>{new Date(announcement.createdAt).toLocaleDateString()}</td>
//             <td>
//               <Link href={`/announcements/${announcement.id}`}>Read More</Link>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )
// }

// export default AnnouncementTable
