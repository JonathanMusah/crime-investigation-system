// // Navbar.tsx

// // Import necessary modules
// import LayoutNavbar from '@layouts/components/vertical/Navbar'
// import NavbarContent from './NavbarContent'

// // Define props type
// type NavbarProps = {
//   userName: string
// }

// const Navbar = ({ userName }: NavbarProps) => {
//   return (
//     <LayoutNavbar>
//       <NavbarContent userName={userName} />
//     </LayoutNavbar>
//   )
// }

// export default Navbar

// Component Imports
import LayoutNavbar from '@layouts/components/vertical/Navbar'
import NavbarContent from './NavbarContent'

const Navbar = () => {
  return (
    <LayoutNavbar>
      <NavbarContent />
    </LayoutNavbar>
  )
}

export default Navbar
