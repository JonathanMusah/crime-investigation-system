'use client'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

type OfficerVerticalMenuProps = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const OfficerVerticalMenu = ({ scrollMenu }: OfficerVerticalMenuProps) => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        {/* Main Dashboard Link */}
        <MenuItem href='/officer' icon={<i className='ri-dashboard-line' />}>
          Main Dashboard
        </MenuItem>

        {/* Dashboards SubMenu */}
        <SubMenu label='Dashboards' icon={<i className='ri-home-smile-line' />}>
          <MenuItem href='/officer/cases' icon={<i className='ri-folder-line' />}>
            All Cases
          </MenuItem>
        </SubMenu>

        {/* Announcements Section */}
        <MenuSection label='Announcements'>
          <MenuItem href='/officer/announcement/new' icon={<i className='ri-notification-line' />}>
            New Announcement
          </MenuItem>
        </MenuSection>

        {/* Prediction Section */}
        <MenuSection label='Prediction'>
          <MenuItem href='/officer/prediction/new' icon={<i className='ri-bar-chart-line' />}>
            Predict Results
          </MenuItem>
          <MenuItem href='/officer/prediction' icon={<i className='ri-bar-chart-2-line' />}>
            View Results
          </MenuItem>
        </MenuSection>

        {/* Suspects Section */}
        <MenuSection label='Suspects'>
          <MenuItem href='/officer/suspect/new' icon={<i className='ri-user-add-line' />}>
            Add Suspects
          </MenuItem>
          <MenuItem href='/officer/suspect' icon={<i className='ri-user-search-line' />}>
            View Suspects
          </MenuItem>
        </MenuSection>

        {/* Evidence Section */}
        <MenuSection label='Evidence'>
          <MenuItem href='/officer/evidence/new' icon={<i className='ri-file-add-line' />}>
            Add Evidence
          </MenuItem>
          <MenuItem href='/officer/evidence' icon={<i className='ri-file-list-2-line' />}>
            View Evidence
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default OfficerVerticalMenu
