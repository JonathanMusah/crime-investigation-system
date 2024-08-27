import React, { useState, useEffect } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  CircularProgress,
  Chip
} from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3]
}))

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white
}))

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold'
}))

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1)
}))

const ComplaintsTable = ({ userRole }: { userRole: string }) => {
  const [complaints, setComplaints] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)
  const [selectedComplaint, setSelectedComplaint] = useState<null | any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState('')

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      const response = await fetch('/api/complaints', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch complaints')
      }

      const data = await response.json()

      setComplaints(data)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      setLoading(false)
    }
  }

  const handleViewComplaint = async (id: string) => {
    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch complaint details')
      }

      const data = await response.json()

      setSelectedComplaint(data)
      setNewStatus(data.status)
      setDialogOpen(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  const handleUpdateStatus = async () => {
    if (userRole !== 'ADMIN') return

    try {
      const response = await fetch(`/api/complaints/${selectedComplaint.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update complaint status')
      }

      setDialogOpen(false)
      fetchComplaints() // Refresh the complaints list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  if (loading) return <CircularProgress color='primary' />
  if (error) return <Typography color='error'>{error}</Typography>

  return (
    <>
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {complaints.map(complaint => (
              <TableRow key={complaint.id}>
                <TableCell>{complaint.title}</TableCell>
                <TableCell>
                  <Chip
                    label={complaint.status}
                    color={
                      complaint.status === 'OPEN'
                        ? 'primary'
                        : complaint.status === 'IN_PROGRESS'
                          ? 'warning'
                          : 'default'
                    }
                  />
                </TableCell>
                <TableCell>{new Date(complaint.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <StyledButton variant='contained' color='primary' onClick={() => handleViewComplaint(complaint.id)}>
                    View
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{selectedComplaint?.title}</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>Description: {selectedComplaint?.description}</Typography>
          <Typography variant='body1'>Status: {selectedComplaint?.status}</Typography>
          <Typography variant='body1'>Created At: {new Date(selectedComplaint?.createdAt).toLocaleString()}</Typography>
          {userRole === 'ADMIN' && (
            <>
              <Typography variant='body1'>Update Status:</Typography>
              <Select value={newStatus} onChange={e => setNewStatus(e.target.value)} fullWidth>
                <MenuItem value='OPEN'>OPEN</MenuItem>
                <MenuItem value='IN_PROGRESS'>IN PROGRESS</MenuItem>
                <MenuItem value='CLOSED'>CLOSED</MenuItem>
              </Select>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          {userRole === 'ADMIN' && (
            <Button onClick={handleUpdateStatus} color='primary'>
              Update Status
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ComplaintsTable

// import React, { useState, useEffect } from 'react'

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem
// } from '@mui/material'

// const ComplaintsTable = ({ userRole }: { userRole: string }) => {
//   const [complaints, setComplaints] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<null | string>(null)
//   const [selectedComplaint, setSelectedComplaint] = useState<null | any>(null as null)
//   const [dialogOpen, setDialogOpen] = useState(false)
//   const [newStatus, setNewStatus] = useState('')

//   useEffect(() => {
//     fetchComplaints()
//   }, [])

//   const fetchComplaints = async () => {
//     try {
//       const response = await fetch('/api/complaints', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })

//       if (!response.ok) {
//         throw new Error('Failed to fetch complaints')
//       }

//       const data = await response.json()

//       setComplaints(data)
//       setLoading(false)
//     } catch (err) {
//       //   setError(err.message)
//       if (err instanceof Error) {
//         setError(err.message)
//       } else {
//         setError('An unknown error occurred')
//       }

//       setLoading(false)
//     }
//   }

//   const handleViewComplaint = async (id: string) => {
//     try {
//       const response = await fetch(`/api/complaints/${id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })

//       if (!response.ok) {
//         throw new Error('Failed to fetch complaint details')
//       }

//       const data = await response.json()

//       setSelectedComplaint(data)
//       setNewStatus(data.status)
//       setDialogOpen(true)
//     } catch (err: any) {
//       setError((err as Error).message)
//     }
//   }

//   const handleUpdateStatus = async () => {
//     if (userRole !== 'ADMIN') return

//     try {
//       const response = await fetch(`/api/complaint/${selectedComplaint.id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ status: newStatus })
//       })

//       if (!response.ok) {
//         throw new Error('Failed to update complaint status')
//       }

//       setDialogOpen(false)
//       fetchComplaints() // Refresh the complaints list
//     } catch (err: any) {
//       setError(err.message)
//     }
//   }

//   if (loading) return <Typography>Loading...</Typography>
//   if (error) return <Typography color='error'>{error}</Typography>

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Title</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Created At</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {complaints.map(complaint => (
//               <TableRow key={complaint.id}>
//                 <TableCell>{complaint.title}</TableCell>
//                 <TableCell>{complaint.status}</TableCell>
//                 <TableCell>{new Date(complaint.createdAt).toLocaleString()}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleViewComplaint(complaint.id)}>View</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>{selectedComplaint?.title}</DialogTitle>
//         <DialogContent>
//           <Typography>Description: {selectedComplaint?.description}</Typography>
//           <Typography>Status: {selectedComplaint?.status}</Typography>
//           <Typography>Created At: {new Date(selectedComplaint?.createdAt).toLocaleString()}</Typography>
//           {userRole === 'ADMIN' && (
//             <>
//               <Typography>Update Status:</Typography>
//               <Select value={newStatus} onChange={e => setNewStatus(e.target.value)}>
//                 <MenuItem value='OPEN'>OPEN</MenuItem>
//                 <MenuItem value='IN_PROGRESS'>IN PROGRESS</MenuItem>
//                 <MenuItem value='CLOSED'>CLOSED</MenuItem>
//               </Select>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Close</Button>
//           {userRole === 'ADMIN' && <Button onClick={handleUpdateStatus}>Update Status</Button>}
//         </DialogActions>
//       </Dialog>
//     </>
//   )
// }

// export default ComplaintsTable
