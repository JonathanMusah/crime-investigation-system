'use client'

import React from 'react'

import Link from 'next/link'

import { useSession } from 'next-auth/react'
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
  Button,
  Stack
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'

interface Announcement {
  id: string
  title: string
  content: string
  createdAt: string
}

const AnnouncementTable: React.FC = () => {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'

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
              <Typography variant='subtitle1' fontWeight='bold'>
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle1' fontWeight='bold'>
                Created At
              </Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant='subtitle1' fontWeight='bold'>
                Actions
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
                <Stack direction='row' spacing={1} justifyContent='center'>
                  <Button
                    variant='outlined'
                    color='primary'
                    size='small'
                    component={Link}
                    href={`/announcements/${announcement.id}`}
                    startIcon={<VisibilityIcon />}
                  >
                    View
                  </Button>
                  {isAdmin && (
                    <Button
                      variant='outlined'
                      color='secondary'
                      size='small'
                      component={Link}
                      href={`/announcements/edit/${announcement.id}`}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  )}
                </Stack>
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

// import React from 'react'

// import Link from 'next/link'

// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   CircularProgress,
//   Alert,
//   Button
// } from '@mui/material'

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
//     queryKey: ['announcements'],
//     queryFn: () => axios.get('/api/announcements').then(res => res.data)
//   })

//   if (isLoading) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
//   if (error) return <Alert severity='error'>Error loading announcements</Alert>

//   return (
//     <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden' }}>
//       <Table>
//         <TableHead style={{ backgroundColor: '#f0f0f0' }}>
//           <TableRow>
//             <TableCell>
//               <Typography variant='h6' fontWeight='bold'>
//                 Title
//               </Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant='h6' fontWeight='bold'>
//                 Created At
//               </Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant='h6' fontWeight='bold' align='center'>
//                 Action
//               </Typography>
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {announcements?.map(announcement => (
//             <TableRow hover key={announcement.id}>
//               <TableCell>{announcement.title}</TableCell>
//               <TableCell>{new Date(announcement.createdAt).toLocaleDateString()}</TableCell>
//               <TableCell align='center'>
//                 <Button
//                   variant='outlined'
//                   color='primary'
//                   size='small'
//                   component={Link}
//                   href={`/announcements/${announcement.id}`}
//                 >
//                   Read More
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )
// }

// export default AnnouncementTable
