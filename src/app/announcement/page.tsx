import React from 'react'

import AnnouncementTable from './AnnouncementTable'
import MainNavbar from '@/components/layout/MainNavbar'
import MainFooter from '@/components/layout/MainFooter'

const page = () => {
  return (
    <>
      <MainNavbar />
      <AnnouncementTable />
      <MainFooter />
    </>
  )
}

export default page
