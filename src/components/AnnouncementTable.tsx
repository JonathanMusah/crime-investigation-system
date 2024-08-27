import React, { useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import type { Announcement } from '@prisma/client'
import IconButton from '@mui/material/IconButton'

// import VisibilityIcon from '@mui/icons-material/Visibility'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const AnnouncementTable = ({ announcements }: { announcements: Announcement[] }) => {
  const [openRow, setOpenRow] = useState<number | null>(null)

  const handleRowClick = (index: number) => {
    setOpenRow(openRow === index ? null : index)
  }

  return (
    <TableContainer component={Paper} elevation={3} style={{ borderRadius: '12px', marginTop: '16px' }}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#1976d2' }}>
            <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Title</TableCell>
            <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Content</TableCell>
            <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
            <TableCell align='center' style={{ color: '#fff', fontWeight: 'bold' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {announcements.map((announcement, index) => (
            <React.Fragment key={announcement.id}>
              <TableRow hover style={{ cursor: 'pointer' }} onClick={() => handleRowClick(index)}>
                <TableCell>
                  <Typography variant='subtitle1' style={{ fontWeight: 'bold' }}>
                    {announcement.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' noWrap>
                    {announcement.content}
                  </Typography>
                </TableCell>
                <TableCell>{new Date(announcement.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align='center'>
                  <Tooltip title='View Details'>
                    <IconButton size='small'>
                      {openRow === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={openRow === index} timeout='auto' unmountOnExit>
                    <Box margin={2}>
                      <Typography variant='body2' color='textSecondary'>
                        {announcement.content}
                      </Typography>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AnnouncementTable
