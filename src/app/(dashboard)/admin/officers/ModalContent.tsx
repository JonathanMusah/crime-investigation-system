import React from 'react'

import { styled, css } from '@mui/system'

interface Props {
  title: string
  description?: string
  children?: React.ReactNode
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025'
}

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
)

// { row }: { row: TableBodyRowType }

const MyModalContent = ({ title, description, children }: Props) => (
  <ModalContent>
    <h2 id='unstyled-modal-title' className='modal-title'>
      {title}
    </h2>
    {description && (
      <p id='unstyled-modal-description' className='modal-description'>
        {description}
      </p>
    )}
    {children}

    {/* <h2 id='unstyled-modal-title' className='modal-title'>
      Edit {row.name}
    </h2>
    <p id='unstyled-modal-description' className='modal-description'>
      Email: {row.email}
    </p>
    <p id='unstyled-modal-description' className='modal-description'>
      Role: {row.role}
    </p> */}
    {/* Add your form fields here */}
  </ModalContent>
)

export default MyModalContent
