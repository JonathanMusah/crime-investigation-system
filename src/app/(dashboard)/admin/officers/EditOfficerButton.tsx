'use client'
import React, { useState } from 'react'

import { Button, Modal, Box } from '@mui/material'
import { styled } from '@mui/system'

import EditModalContent from './EditModalContent'
import type { Officer as TableOfficer } from './OfficersTable'

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2)
}))

// Define the Officer type expected by EditModalContent
interface EditModalOfficer {
  id: string
  name: string
  phone: string
  address: string
  picture?: string
  user: {
    email: string
  }
}

interface EditOfficerButtonProps {
  officer: TableOfficer
}

const EditOfficerButton: React.FC<EditOfficerButtonProps> = ({ officer }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // Convert TableOfficer to EditModalOfficer
  const convertedOfficer: EditModalOfficer = {
    ...officer,
    picture: officer.picture || undefined
  }

  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleOpen}>
        Edit
      </Button>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby='edit-officer-modal'
        aria-describedby='modal-to-edit-officer-details'
      >
        <Box sx={{ outline: 'none' }}>
          <EditModalContent officer={convertedOfficer} onClose={handleClose} />
        </Box>
      </StyledModal>
    </>
  )
}

export default EditOfficerButton

// 'use client'
// import React, { useState } from 'react'

// import { Button, Modal, Box } from '@mui/material'
// import { styled } from '@mui/system'

// import EditModalContent from './EditModalContent'
// import type { Officer } from './OfficersTable'

// const StyledModal = styled(Modal)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: theme.spacing(2)
// }))

// interface EditOfficerButtonProps {
//   officer: Officer
// }

// const EditOfficerButton: React.FC<EditOfficerButtonProps> = ({ officer }) => {
//   const [open, setOpen] = useState(false)

//   const handleOpen = () => setOpen(true)
//   const handleClose = () => setOpen(false)

//   return (
//     <>
//       <Button variant='outlined' color='primary' onClick={handleOpen}>
//         Edit
//       </Button>
//       <StyledModal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby='edit-officer-modal'
//         aria-describedby='modal-to-edit-officer-details'
//       >
//         <Box sx={{ outline: 'none' }}>
//           <EditModalContent officer={officer} onClose={handleClose} />
//         </Box>
//       </StyledModal>
//     </>
//   )
// }

// export default EditOfficerButton
