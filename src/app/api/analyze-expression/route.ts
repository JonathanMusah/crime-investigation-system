import { NextResponse } from 'next/server'

import axios from 'axios'

export async function POST(request: Request) {
  const { imageUrl } = await request.json()

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
  }

  try {
    // Fetch the image
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64')

    // Send to Roboflow
    const response = await axios({
      method: 'POST',
      url: 'https://classify.roboflow.com/fer-final-project/1',
      params: {
        api_key: process.env.ROBOFLOW_API_KEY
      },
      data: base64Image,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error analyzing facial expression:', error)

    return NextResponse.json(
      { error: 'Error analyzing facial expression', details: (error as Error).message },
      { status: 500 }
    )
  }
}
