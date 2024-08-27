import React from 'react'

import Register from './Register'
import MainNavbar from '@/components/layout/MainNavbar'
import MainFooter from '@/components/layout/MainFooter'

const page = () => {
  return (
    <>
      <MainNavbar />
      <Register />
      <MainFooter />
    </>
  )
}

export default page
