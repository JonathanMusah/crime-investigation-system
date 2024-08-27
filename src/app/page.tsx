'use client'

import { useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import AnnouncementTable from '@components/AnnouncementTable'
import MainNavbar from '@components/layout/MainNavbar'
import MainFooter from '@components/layout/MainFooter'
import MainBanner from '@components/MainBanner'

import Statistics from '@components/Statistics'
import NewsUpdates from '@components/NewsUpdates'
import RecentCases from '@components/RecentCases'

const HomePage = () => {
  const { data: session } = useSession()

  const [stats, setStats] = useState({
    openCases: 0,
    solvedCases: 0,
    officersOnDuty: 0,
    pendingReports: 0
  })

  const [announcements, setAnnouncements] = useState([])
  const [recentCases, setRecentCases] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, announcementsResponse, casesResponse] = await Promise.all([
          fetch('/api/public-statistics'),
          fetch('/api/announcements'),
          fetch('/api/cases')
        ])

        const statsData = await statsResponse.json()
        const announcementsData = await announcementsResponse.json()
        const casesData = await casesResponse.json()

        setStats(statsData)
        setAnnouncements(announcementsData)
        setRecentCases(casesData.slice(0, 5)) // Only show 5 most recent cases
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <MainNavbar />
      <Container maxWidth='xl'>
        <Box my={4}>
          <MainBanner userName={session?.user?.name || ''} />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Card elevation={3}>
              <CardContent>
                <Statistics stats={stats} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Recent Cases
                </Typography>
                <RecentCases cases={recentCases} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  News & Updates
                </Typography>
                <NewsUpdates />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Announcements
                </Typography>
                <AnnouncementTable announcements={announcements} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <MainFooter />
    </>
  )
}

export default HomePage

// 'use client'

// import { useState, useEffect } from 'react'

// import Grid from '@mui/material/Grid'
// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import Typography from '@mui/material/Typography'

// import AnnouncementTable from '@components/AnnouncementTable'
// import MainNavbar from '@components/layout/MainNavbar'
// import MainFooter from '@components/layout/MainFooter'
// import MainBanner from '@components/MainBanner'

// import Statistics from '@components/Statistics'
// import NewsUpdates from '@components/NewsUpdates'
// import RecentCases from '@components/RecentCases'

// const HomePage = ({ userName }: { userName: string }) => {
//   const [stats, setStats] = useState({
//     openCases: 0,
//     solvedCases: 0,
//     officersOnDuty: 0,
//     pendingReports: 0
//   })

//   const [announcements, setAnnouncements] = useState([])
//   const [recentCases, setRecentCases] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [statsResponse, announcementsResponse, casesResponse] = await Promise.all([
//           fetch('/api/public-statistics'),
//           fetch('/api/announcements'),
//           fetch('/api/cases')
//         ])

//         const statsData = await statsResponse.json()
//         const announcementsData = await announcementsResponse.json()
//         const casesData = await casesResponse.json()

//         setStats(statsData)
//         setAnnouncements(announcementsData)
//         setRecentCases(casesData.slice(0, 5)) // Only show 5 most recent cases
//       } catch (error) {
//         console.error('Error fetching data:', error)
//       }
//     }

//     fetchData()
//   }, [])

//   return (
//     <>
//       <MainNavbar />
//       <Container maxWidth='xl'>
//         <Box my={4}>
//           <MainBanner userName={userName} />
//         </Box>

//         <Grid container spacing={4}>
//           <Grid item xs={12} md={12}>
//             <Card elevation={3}>
//               <CardContent>
//                 <Statistics stats={stats} />
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Card elevation={3}>
//               <CardContent>
//                 <Typography variant='h6' gutterBottom>
//                   Recent Cases
//                 </Typography>
//                 <RecentCases cases={recentCases} />
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Card elevation={3}>
//               <CardContent>
//                 <Typography variant='h6' gutterBottom>
//                   News & Updates
//                 </Typography>
//                 <NewsUpdates />
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12}>
//             <Card elevation={3}>
//               <CardContent>
//                 <Typography variant='h6' gutterBottom>
//                   Announcements
//                 </Typography>
//                 <AnnouncementTable announcements={announcements} />
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//       <MainFooter />
//     </>
//   )
// }

// export default HomePage
