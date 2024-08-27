import React from 'react'

import { Box, Typography, Button } from '@mui/material'

const MainBanner = ({ userName }: { userName?: string }) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #1a237e, #283593)',
        p: 6,
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'center',
        mb: 4,
        color: 'white',
        minHeight: '200px'
      }}
    >
      <Typography variant='h3' component='h1' fontWeight='bold' gutterBottom>
        {userName ? `Welcome, ${userName}!` : 'Welcome to our Criminal Investigation System'}
      </Typography>
      <Typography variant='body1' gutterBottom>
        Empowering law enforcement with cutting-edge technology
      </Typography>
      <Typography variant='body2' gutterBottom>
        Streamline investigations, enhance collaboration, and ensure justice
      </Typography>
      <Button variant='contained' color='secondary' sx={{ marginTop: 2 }}>
        Learn More
      </Button>
    </Box>
  )
}

export default MainBanner

// import React from 'react'

// import { Box, Typography, Button } from '@mui/material'


// const MainBanner = ({ userName }: { userName: string }) => {
//   return (
//     <Box
//       sx={{
//         background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
//         p: 6,
//         borderRadius: 2,
//         boxShadow: 3,
//         textAlign: 'center',
//         mb: 4,
//         color: 'white',
//         minHeight: '200px' // Increase the height of the banner
//       }}
//     >
//       {/* <GradientBackground> */}
//       <Typography variant='h3' component='h1' fontWeight='bold' gutterBottom>
//         Welcome, {userName}!
//       </Typography>
//       <Typography variant='body1' gutterBottom>
//         Manage your criminal investigation tasks effectively with our system.
//       </Typography>
//       <Typography variant='body2' gutterBottom>
//         Stay updated with the latest case statuses, evidence, and predictions.
//       </Typography>
//       <Button variant='contained' color='secondary' sx={{ marginTop: 2 }}>
//         Get Started
//       </Button>
//       {/* </GradientBackground> */}
//     </Box>
//   )
// }

// export default MainBanner
