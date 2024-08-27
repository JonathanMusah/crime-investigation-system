'use client'

import React, { useState } from 'react'

import { Button, Modal } from '@mui/material'
import { styled } from '@mui/system'

import { useMutation } from '@tanstack/react-query'

import axios from 'axios'

import Spinner from '@/components/Spinner'
import type { Case } from './CasesTable'
import CasesModalContent from './CasesModalContent'

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBackdrop = styled('div')`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-width: 100px;
`

interface DeleteCaseButtonProps {
  cases: Case
  onDelete: (id: string) => void
}

const DeleteCaseButton = ({ onDelete, cases }: DeleteCaseButtonProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const deleteCase = async (id: string) => {
    await axios.delete(`/api/cases/${id}`)
  }

  const deleteMutation = useMutation({
    mutationFn: deleteCase,
    onSuccess: () => {
      onDelete(cases.id)
      handleClose()
    },
    onError: error => {
      console.error('Failed to delete Case:', error)
    }
  })

  const handleDelete = () => {
    deleteMutation.mutate(cases.id)
  }

  const DeleteModalContent = () => (
    <CasesModalContent title={`Delete ${cases.caseName}`} description={`Are you sure you want to delete this user?`}>
      <StyledButton
        variant='contained'
        color='error'
        onClick={handleDelete}
        disabled={deleteMutation.status === 'pending'}
      >
        {deleteMutation.status === 'pending' ? 'Deleting Case' : 'Confirm Delete'}
        {deleteMutation.status === 'pending' && <Spinner />}
      </StyledButton>
    </CasesModalContent>
  )

  return (
    <>
      <StyledButton
        variant='outlined'
        color='error'
        onClick={handleOpen}
        disabled={deleteMutation.status === 'pending'}
      >
        {deleteMutation.status === 'pending' ? 'Deleting' : 'Delete'}
        {deleteMutation.status === 'pending' && <Spinner />}
      </StyledButton>
      <StyledModal open={open} onClose={handleClose} slots={{ backdrop: StyledBackdrop }}>
        <DeleteModalContent />
      </StyledModal>
    </>
  )
}

export default DeleteCaseButton
