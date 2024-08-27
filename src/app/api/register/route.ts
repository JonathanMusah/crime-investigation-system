// File: src/app/api/register/route.ts
import { NextResponse } from 'next/server'

import bcrypt from 'bcrypt'

import prisma from '../../../../prisma/client' // Adjust the import path if necessary

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'NORMAL_USER'
      }
    })

    return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)

    return NextResponse.json({ message: 'Error creating user' }, { status: 500 })
  }
}
