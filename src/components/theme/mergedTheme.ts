/*
 * We recommend using the merged theme if you want to override our core theme.
 * This means you can use our core theme and override it with your own customizations.
 * Write your overrides in the userTheme object in this file.
 * The userTheme object is merged with the coreTheme object within this file.
 * Export this file and import it in the `@components/theme/index.tsx` file to use the merged theme.
 */

// MUI Imports

// import { Poppins } from 'next/font/google'

import { Montserrat } from 'next/font/google'

import { deepmerge } from '@mui/utils'
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { Settings } from '@core/contexts/settingsContext'
import type { SystemMode } from '@core/types'

// Core Theme Imports
import coreTheme from '@core/theme'

// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700', '800', '900']
// })

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

const mergedTheme = (settings: Settings, mode: SystemMode, direction: Theme['direction']) => {
  // Vars
  // const userTheme = {
  //   // Write your overrides here.
  //   typography: {
  //     fontFamily: poppins.style.fontFamily
  //   }
  // } as Theme

  const userTheme = {
    // Write your overrides here.
    typography: {
      fontFamily: montserrat.style.fontFamily
    }
  } as Theme

  return deepmerge(coreTheme(mode, direction), userTheme)
}

export default mergedTheme
