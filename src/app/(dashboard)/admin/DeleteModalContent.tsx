import React from 'react'

import { Button } from '@mui/material'

import ModalContent from './ModalContent'

import type { Case } from './cases/CasesTable'

interface Props {
  caseData: Case
  onDelete: () => void
}

const DeleteModalContent = ({ caseData, onDelete }: Props) => (
  <ModalContent title={`Delete ${caseData.caseName}`} description={`Are you sure you want to delete this user?`}>
    <Button variant='contained' color='error' onClick={onDelete}>
      Confirm Delete
    </Button>
  </ModalContent>
)

export default DeleteModalContent
