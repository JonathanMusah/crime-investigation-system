// MUI Imports
import Chip from '@mui/material/Chip'
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

const VerticalMenu = ({ scrollMenu }: { scrollMenu: (container: any, isPerfectScrollbar: boolean) => void }) => {
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
        <MenuItem href='/admin' icon={<i className='ri-dashboard-line' />}>
          Main Dashboard
        </MenuItem>

        {/* Dashboards Section */}
        <SubMenu
          label='Dashboards'
          icon={<i className='ri-home-smile-line' />}
          suffix={<Chip label='5' size='small' color='error' />}
        >
          <MenuItem href='/admin/cases' icon={<i className='ri-folder-open-line' />}>
            All Cases
          </MenuItem>
          <MenuItem href='/admin/officers' icon={<i className='ri-shield-user-line' />}>
            View Officers
          </MenuItem>
        </SubMenu>

        {/* Personnel Management Section */}
        <MenuSection label='Personnel Management'>
          <MenuItem href='/admin/suspect/new' icon={<i className='ri-user-search-line' />}>
            Add Suspect
          </MenuItem>
          <MenuItem href='/admin/suspect' icon={<i className='ri-user-search-line' />}>
            View Suspects
          </MenuItem>
          <MenuItem href='/admin/officers/new' icon={<i className='ri-user-add-line' />}>
            Add Officer
          </MenuItem>
          <MenuItem href='/admin/add-case-officer' icon={<i className='ri-user-settings-line' />}>
            Assign Case Officer
          </MenuItem>
        </MenuSection>

        {/* Case Management Section */}
        <MenuSection label='Case Management'>
          <MenuItem href='/admin/cases/new' icon={<i className='ri-folder-add-line' />}>
            Add Case
          </MenuItem>
          <MenuItem href='/admin/evidence/new' icon={<i className='ri-chat-3-line' />}>
            Add Evidence
          </MenuItem>
          <MenuItem href='/admin/evidence' icon={<i className='ri-menu-search-line' />}>
            View Evidence
          </MenuItem>
        </MenuSection>

        {/* Announcements Section */}
        <MenuSection label='Announcements | Complaints'>
          <MenuItem href='/admin/announcement/new' icon={<i className='ri-notification-line' />}>
            Add Announcement
          </MenuItem>
          <MenuItem href='/admin/complaint' icon={<i className='ri-megaphone-line' />}>
            View Complaints
          </MenuItem>
        </MenuSection>

        {/* Prediction and Results Section */}
        <MenuSection label='Predictions & Results'>
          <MenuItem href='/admin/prediction/new' icon={<i className='ri-brain-line' />}>
            Predict Results
          </MenuItem>
          <MenuItem href='/admin/prediction' icon={<i className='ri-file-list-line' />}>
            View Predictions
          </MenuItem>
          <MenuItem href='/admin/results/new' icon={<i className='ri-file-add-line' />}>
            Add Results
          </MenuItem>
          <MenuItem href='/admin/results' icon={<i className='ri-file-search-line' />}>
            View Results
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
