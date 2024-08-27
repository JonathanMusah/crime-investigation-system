import React from 'react'

import { Button } from '@mui/material'

import ModalContent from './ModalContent'

import type { Officer } from './OfficersTable'

interface Props {
  row: Officer
  onDelete: () => void
}

const DeleteModalContent = ({ row, onDelete }: Props) => (
  <ModalContent title={`Delete ${row.name}`} description={`Are you sure you want to delete this user?`}>
    <Button variant='contained' color='error' onClick={onDelete}>
      Confirm Delete
    </Button>
  </ModalContent>
)

export default DeleteModalContent
