// MUI Imports
import Grid from '@mui/material/Grid'

import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'

import AddOfficerForm from './AddOfficerForm'

const AddOfficerPage = () => {
  return (
    <Card>
      <CardHeader title='Add Officer' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AddOfficerForm />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AddOfficerPage
