import React from 'react'

import Link from 'next/link'

import { Box, Container, Typography, Grid } from '@mui/material'

const MainFooter = () => {
  return (
    <Box component='footer' bgcolor='grey.100' py={3} mt='auto'>
      <Container maxWidth='lg'>
        <Grid container spacing={4} justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='body2' color='textSecondary'>
              &copy; {new Date().getFullYear()} Crime Investigation System. All rights reserved.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body2' color='textSecondary'>
              Jonathan Musah - 4121210109| Jonas Agguday - 4121210044
            </Typography>
          </Grid>
          <Grid item>
            <Box display='flex' justifyContent='center'>
              <FooterLink href='/'>License</FooterLink>
              <FooterLink href='/'>About</FooterLink>
              <FooterLink href='/'>Contact</FooterLink>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} passHref>
    <Typography variant='body2' color='textSecondary' style={{ margin: '0 8px' }}>
      {children}
    </Typography>
  </Link>
)

export default MainFooter
