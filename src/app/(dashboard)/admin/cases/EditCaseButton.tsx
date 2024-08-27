'use client'
import React, { useState, memo } from 'react'

import { Button, Modal, Box } from '@mui/material'
import { styled } from '@mui/system'

import EditModalContent from './EditModalContent'
import type { Case } from './CasesTable'

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2)
}))

interface EditCaseButtonProps {
  caseItem: Case
}

const EditCaseButton = memo(({ caseItem }: EditCaseButtonProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleOpen}>
        Edit
      </Button>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby='edit-case-modal'
        aria-describedby='modal-to-edit-case-details'
      >
        <Box sx={{ outline: 'none', maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto' }}>
          <EditModalContent caseItem={caseItem} onClose={handleClose} />
        </Box>
      </StyledModal>
    </>
  )
})

EditCaseButton.displayName = 'EditCaseButton'

export default EditCaseButton
