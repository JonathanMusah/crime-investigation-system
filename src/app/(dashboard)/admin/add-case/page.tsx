import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import AddCaseForm from './AddCaseForm'

const AddCasePage = () => {
  return (
    <Card>
      <CardHeader title='Add Case' />
      <CardContent>
        <AddCaseForm />
      </CardContent>
    </Card>
  )
}

export default AddCasePage
