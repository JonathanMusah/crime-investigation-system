'use client'

import React, { useState } from 'react'

import { Button, Modal } from '@mui/material'
import { styled } from '@mui/system'

import { useMutation } from '@tanstack/react-query'

import axios from 'axios'

import ModalContent from './ModalContent'
import type { Officer } from './OfficersTable'
import Spinner from '@/components/Spinner'

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

interface DeleteOfficerButtonProps {
  officer: Officer
  onDelete: (id: string) => void
}

const DeleteOfficerButton: React.FC<DeleteOfficerButtonProps> = ({ officer, onDelete }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const deleteOfficer = async (id: string) => {
    await axios.delete(`/api/officers/${id}`)
  }

  const mutation = useMutation({
    mutationFn: deleteOfficer,
    onSuccess: () => {
      onDelete(officer.id)
      handleClose()
    },
    onError: error => {
      console.error('Failed to delete officer:', error)
    }
  })

  const handleDelete = () => {
    mutation.mutate(officer.id)
  }

  const DeleteModalContent = () => (
    <ModalContent title={`Delete ${officer.name}`} description={`Are you sure you want to delete this user?`}>
      <StyledButton variant='contained' color='error' onClick={handleDelete} disabled={mutation.status === 'pending'}>
        {mutation.status === 'pending' ? 'Deleting Officer' : 'Confirm Delete'}
        {mutation.status === 'pending' && <Spinner />}
      </StyledButton>
    </ModalContent>
  )

  return (
    <>
      <StyledButton variant='outlined' color='error' onClick={handleOpen} disabled={mutation.status === 'pending'}>
        {mutation.status === 'pending' ? 'Deleting' : 'Delete'}
        {mutation.status === 'pending' && <Spinner />}
      </StyledButton>
      <StyledModal open={open} onClose={handleClose} slots={{ backdrop: StyledBackdrop }}>
        <DeleteModalContent />
      </StyledModal>
    </>
  )
}

export default DeleteOfficerButton
