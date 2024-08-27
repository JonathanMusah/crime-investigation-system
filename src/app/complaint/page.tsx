import React from 'react'

import ComplaintForm from './ComplaintForm'
import MainNavbar from '@/components/layout/MainNavbar'
import MainFooter from '@/components/layout/MainFooter'

const page = () => {
  return (
    <>
      <MainNavbar />
      <ComplaintForm />
      <MainFooter />
    </>
  )
}

export default page
