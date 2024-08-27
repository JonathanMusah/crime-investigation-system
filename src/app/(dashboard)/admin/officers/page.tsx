import React from 'react'

import { Box } from '@mui/material'

import OfficersTable from './OfficersTable'

// import OfficersActions from './OfficersActions'

const OfficersListPage = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* <OfficersActions /> */}
      <OfficersTable />
    </Box>
  )
}

export default OfficersListPage
