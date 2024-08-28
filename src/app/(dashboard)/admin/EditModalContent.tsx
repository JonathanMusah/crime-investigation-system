import React from 'react'

import ModalContent from './ModalContent'
import type { Case } from './cases/CasesTable'

interface Props {
  caseData: Case
}

const EditModalContent = ({ caseData }: Props) => (
  <ModalContent title={`Edit ${caseData.caseName}`} description={`Email: ${caseData.Description}`}>
    {/* Add your form fields here */}
    {/* <p>Role: {caseData.role}</p> */}
    {/* Add form fields for editing */}
  </ModalContent>
)

export default EditModalContent
