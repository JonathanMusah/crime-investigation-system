'use client'

import React from 'react'

import { useSession } from 'next-auth/react'

import ComplaintsTable from './ComplaintTable'

const Page = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return <div>Access Denied. Please sign in.</div>
  }

  return (
    <div>
      <ComplaintsTable userRole={session?.user?.role || ''} />
    </div>
  )
}

export default Page

// import React from 'react'

// import ComplaintsTable from './ComplaintTable'

// const page = () => {
//   return (
//     <div>
//       <ComplaintsTable />
//     </div>
//   )
// }

// export default page
