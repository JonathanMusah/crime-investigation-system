import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { Prisma } from '@prisma/client'

import bcrypt from 'bcrypt'

import prisma from '../../../../../prisma/client'
import { officerSchema } from '@/app/ValidationSchemas'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()

  const validation = officerSchema.safeParse(body)

  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 })

  const { name, email, phone, address, password, picture } = body

  try {
    let hashedPassword

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }

    const updatedOfficer = await prisma.officer.update({
      where: { id: params.id, isDeleted: false },
      data: {
        name,
        phone,
        address,
        picture,
        user: {
          update: {
            email,
            ...(hashedPassword && { password: hashedPassword })
          }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            status: true
          }
        }
      }
    })

    // Remove the password from the response
    const { user, ...officerWithoutUserPassword } = updatedOfficer

    return NextResponse.json({ ...officerWithoutUserPassword, user }, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Invalid Officer' }, { status: 404 })
    }

    console.error('Error updating officer:', error)

    return NextResponse.json({ error: 'An error occurred while updating the officer' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updatedOfficer = await prisma.officer.update({
      where: { id: params.id },
      data: { isDeleted: true },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            status: true
          }
        }
      }
    })

    // The associated user will be automatically deleted due to the cascade delete

    // return NextResponse.json(
    //   { message: 'Officer and associated user deleted successfully', deletedOfficer },
    //   { status: 200 }
    // )
    return NextResponse.json({ message: 'Officer marked as deleted successfully', updatedOfficer }, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Invalid Officer' }, { status: 404 })
    }

    console.error('Error deleting officer:', error)

    return NextResponse.json({ error: 'An error occurred while deleting the officer' }, { status: 500 })
  }
}
