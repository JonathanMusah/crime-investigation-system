import React from 'react'

import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { Button, Stack } from '@mui/material'

interface CloudinaryUploadProps {
  onUpload: (publicId: string) => void
  onReset: () => void
  publicId: string
  width?: number
  height?: number
}

const CloudinaryUpload = ({ onUpload, onReset, publicId, width = 180, height = 180 }: CloudinaryUploadProps) => {
  return (
    <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between'>
      <div className={`relative overflow-hidden rounded-lg shadow-md bg-gray-100`} style={{ width, height }}>
        {publicId ? (
          <CldImage
            src={publicId}
            fill
            style={{ objectFit: 'cover' }}
            alt='profile image'
            className='border border-gray-200'
          />
        ) : (
          <div className='flex items-center justify-center w-full h-full text-gray-400'>No image uploaded</div>
        )}
      </div>
      <Stack direction='row' spacing={2}>
        <CldUploadWidget
          uploadPreset='km4tuv1w'
          onSuccess={result => {
            if (result.event !== 'success') return
            const info = result.info as { public_id: string }

            onUpload(info.public_id)
          }}
        >
          {({ open }) => (
            <Button onClick={() => open()} variant='contained' component='span'>
              {publicId ? 'Change Photo' : 'Upload Photo'}
            </Button>
          )}
        </CldUploadWidget>
        {publicId && (
          <Button onClick={onReset} variant='outlined' color='secondary'>
            Reset
          </Button>
        )}
      </Stack>
    </div>
  )
}

export default CloudinaryUpload
