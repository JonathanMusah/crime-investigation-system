import React from 'react'

import CardHeader from '@mui/material/CardHeader'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import AddCaseOfficerForm from './AddCaseOfficerForm'

const AddCaseOfficerPage = () => {
  return (
    <Card>
      <CardHeader title='Add  officer to a case' />
      <CardContent>
        <AddCaseOfficerForm />
      </CardContent>
    </Card>
  )
}

export default AddCaseOfficerPage
