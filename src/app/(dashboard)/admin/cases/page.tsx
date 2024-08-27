import React from 'react'

import { Box } from '@mui/material'

import CasesTable from './CasesTable'

// import CasesActions from './CasesActions'

const CasesListPage = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* <CasesActions /> */}
      <CasesTable />
    </Box>
  )
}

export default CasesListPage
