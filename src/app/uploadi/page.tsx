'use client'
import React, { useState } from 'react'

import { CldUploadWidget, CldImage } from 'next-cloudinary'

interface CloudinaryResult {
  public_id: string
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState('')

  return (
    <>
      <CldImage src={publicId} height={180} width={180} alt='profile picture' />
      <CldUploadWidget
        uploadPreset='km4tuv1w'
        onSuccess={(result, widget) => {
          if (result.event !== 'success') return
          const info = result.info as CloudinaryResult

          setPublicId(info.public_id)
        }}
      >
        {({ open }) => {
          return (
            <button className='btn' onClick={() => open()}>
              Upload
            </button>
          )
        }}
      </CldUploadWidget>
    </>
  )
}

export default UploadPage
