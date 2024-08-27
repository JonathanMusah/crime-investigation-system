import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// import CircularProgress from '@mui/material/CircularProgress'
import { green, blue, red, orange } from '@mui/material/colors'
import ReportIcon from '@mui/icons-material/Report'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonIcon from '@mui/icons-material/Person'
import WarningIcon from '@mui/icons-material/Warning'

const Statistics = ({ stats }: { stats: any }) => {
  return (
    <Card elevation={3} style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Department Statistics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
              p={2}
              style={{ backgroundColor: green[100], borderRadius: '8px' }}
            >
              <ReportIcon style={{ fontSize: 40, color: green[600] }} />
              <Typography variant='h6' color='textSecondary'>
                Open Cases
              </Typography>
              <Typography variant='h4' color='textPrimary'>
                {stats.openCases}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
              p={2}
              style={{ backgroundColor: blue[100], borderRadius: '8px' }}
            >
              <CheckCircleIcon style={{ fontSize: 40, color: blue[600] }} />
              <Typography variant='h6' color='textSecondary'>
                Solved Cases
              </Typography>
              <Typography variant='h4' color='textPrimary'>
                {stats.solvedCases}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
              p={2}
              style={{ backgroundColor: red[100], borderRadius: '8px' }}
            >
              <PersonIcon style={{ fontSize: 40, color: red[600] }} />
              <Typography variant='h6' color='textSecondary'>
                Officers on Duty
              </Typography>
              <Typography variant='h4' color='textPrimary'>
                {stats.officersOnDuty}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
              p={2}
              style={{ backgroundColor: orange[100], borderRadius: '8px' }}
            >
              <WarningIcon style={{ fontSize: 40, color: orange[600] }} />
              <Typography variant='h6' color='textSecondary'>
                Pending Reports
              </Typography>
              <Typography variant='h4' color='textPrimary'>
                {stats.pendingReports}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Statistics
