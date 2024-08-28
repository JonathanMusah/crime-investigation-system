// File: src/app/api/create-admin/route.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import bcrypt from 'bcrypt'

import prisma from '../../../../prisma/client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  try {
    const adminEmail = 'admin@example.com' // Replace with the actual admin email
    const adminPassword = 'securepassword' // Replace with a strong password

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Admin user already exists' }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // Create the admin user
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin User', // You can customize the name
        role: 'ADMIN',
        status: 'ACTIVE',
        admin: {
          create: {
            name: 'Admin User' // This refers to the related Admin model
          }
        }
      }
    })

    return NextResponse.json({ message: 'Admin user created successfully', adminUser }, { status: 200 })
  } catch (error) {
    console.error('Error creating admin user:', error)

    return NextResponse.json({ error: 'Failed to create admin user' }, { status: 500 })
  }
}
