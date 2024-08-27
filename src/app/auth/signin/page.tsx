import React from 'react'

import SignIn from './SignIn'
import MainNavbar from '@/components/layout/MainNavbar'
import MainFooter from '@/components/layout/MainFooter'

const page = () => {
  return (
    <>
      <MainNavbar />
      <SignIn />
      <MainFooter />
    </>
  )
}

export default page
