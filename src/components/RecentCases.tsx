import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import { green, red, blue } from '@mui/material/colors'

// import Button from '@mui/material/Box'

const RecentCases = ({ cases }: { cases: Array<any> }) => {
  // Function to return different icons and colors based on case status
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'solved':
        return <CheckCircleIcon style={{ color: green[500] }} />
      case 'open':
        return <ErrorIcon style={{ color: red[500] }} />
      default:
        return <InfoIcon style={{ color: blue[500] }} />
    }
  }

  return (
    <Card elevation={3} style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Recent Cases
        </Typography>
        <List>
          {cases.map(caseItem => (
            <ListItem
              key={caseItem.id}
              button
              style={{
                transition: 'background-color 0.3s',
                borderRadius: '8px',
                marginBottom: '8px',
                padding: '12px'
              }}
            >
              <ListItemIcon>{getStatusIcon(caseItem.status)}</ListItemIcon>
              <ListItemText primary={caseItem.caseName} secondary={`Status: ${caseItem.status}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default RecentCases
