import React from 'react'

import Link from 'next/link'

import IconButton from '@mui/material/IconButton'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'

import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

const MainNavbar = () => {
  return (
    <AppBar position='static' color='default' elevation={2}>
      <Toolbar className='max-w-7xl mx-auto w-full'>
        <Link href='/' passHref>
          <img className='h-8 w-auto mr-4 cursor-pointer' src='/images/logos/mlogo.png' alt='Logo' />
        </Link>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Crime Investigation System
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <NavLink href='/announcement'>Announcements</NavLink>
          <NavLink href='/complaint'>File Complaint</NavLink>
          <ModeDropdown />
          <IconButton className='ml-2 text-textPrimary'>
            <i className='ri-notification-2-line' />
          </IconButton>
          <UserDropdown />
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton edge='end' color='inherit'>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Button component={Link} href={href} color='inherit' className='text-gray-500 hover:text-gray-900'>
    {children}
  </Button>
)

export default MainNavbar

