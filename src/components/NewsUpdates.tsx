import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import AnnouncementIcon from '@mui/icons-material/Announcement'

const NewsUpdates = () => {
  const [expanded, setExpanded] = useState<number | null>(null)

  const handleExpandClick = (index: number) => {
    setExpanded(expanded === index ? null : index)
  }

  const newsItems = [
    {
      title: 'New Crime Analysis Tool Launched',
      description: 'Our department has implemented a state-of-the-art crime analysis tool to enhance investigations.'
    },
    {
      title: 'Community Outreach Program Successful',
      description: 'The recent community outreach program has led to increased cooperation in solving local crimes.'
    }
  ]

  return (
    <Card elevation={3} style={{ borderRadius: '12px' }}>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          News & Updates
        </Typography>
        <List>
          {newsItems.map((item, index) => (
            <div key={index}>
              <ListItem
                button
                onClick={() => handleExpandClick(index)}
                style={{
                  borderRadius: '8px',
                  transition: 'background-color 0.3s'
                }}
              >
                <ListItemIcon>
                  <AnnouncementIcon style={{ color: '#1976d2' }} />
                </ListItemIcon>
                <ListItemText primary={item.title} />
                <IconButton
                  edge='end'
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={expanded === index}
                  aria-label='show more'
                >
                  <ExpandMoreIcon />
                </IconButton>
              </ListItem>
              <Collapse in={expanded === index} timeout='auto' unmountOnExit>
                <CardContent style={{ backgroundColor: '#f5f5f5' }}>
                  <Typography variant='body2' color='textSecondary'>
                    {item.description}
                  </Typography>
                </CardContent>
              </Collapse>
              {index < newsItems.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default NewsUpdates
