import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Spinner = () => {
  return (
    <Box sx={{ display: 'flex' }} className="ml-2">
      <CircularProgress size={20} color='inherit' />
    </Box>
  )
}

export default Spinner
