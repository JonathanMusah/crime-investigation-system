import { NextResponse, type NextRequest } from 'next/server'

import type { Session } from 'next-auth'
import bcrypt from 'bcrypt'

import { PrismaClient, Prisma } from '@prisma/client'

import { getServerSession } from 'next-auth/next'

// import prisma from '../../../../prisma/client'
import { officerSchema, userSchema } from '@/app/ValidationSchemas'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const officers = await prisma.officer.findMany({
    where: {
      isDeleted: false
    },
    include: {
      user: {
        select: {
          email: true,
          status: true
        }
      }
    }
  })

  return NextResponse.json(officers)
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
  }
}

export async function POST(request: NextRequest) {
  const session = (await getServerSession(authOptions)) as Session | null

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const body = await request.json()

    const combinedSchema = officerSchema.merge(userSchema.pick({ email: true, password: true }))
    const validation = combinedSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const newOfficer = await prisma.$transaction(async prisma => {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          role: 'OFFICER'
        }
      })

      const officer = await prisma.officer.create({
        data: {
          name: body.name,
          phone: body.phone,
          address: body.address,
          picture: body.picture,
          user: {
            connect: { id: user.id }
          }
        }
      })

      return officer
    })

    return NextResponse.json(newOfficer, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ error: 'A user with this email already exists' }, { status: 409 })
      }
    }

    console.error('Failed to create officer:', error)

    return NextResponse.json({ error: 'Failed to create officer' }, { status: 500 })
  }
}
