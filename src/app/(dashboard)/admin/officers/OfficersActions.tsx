'use client'
import React, { useState } from 'react'

import { Box, TextField, Menu, MenuItem, Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const OfficersActions = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Button variant='outlined' onClick={handleClick} endIcon={<MoreVertIcon />}>
        Action
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Reward</MenuItem>
        <MenuItem onClick={handleClose}>Promote</MenuItem>
        <MenuItem onClick={handleClose}>Activate account</MenuItem>
        <MenuItem onClick={handleClose}>Delete User</MenuItem>
      </Menu>
      <TextField id='search' label='Search for users' variant='outlined' size='small' />
    </Box>
  )
}

export default OfficersActions
