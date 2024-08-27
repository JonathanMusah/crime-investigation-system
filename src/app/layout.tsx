// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

import Providers from '@components/Providers'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import QueryClientProvider from './QueryClientProvider'
import AuthProvider from './auth/Provider'

export const metadata = {
  title: 'Crime - Crime Investigation System',
  description:
    'Crime Investigation System is a web application that helps police officers and detectives to manage and solve criminal cases.'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <Providers direction={direction}>
          <AuthProvider>
            <QueryClientProvider>{children}</QueryClientProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
