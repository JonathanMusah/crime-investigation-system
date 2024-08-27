import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

import prisma from '../../../../../prisma/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
        userType: { label: 'User Type', type: 'text' },
        officerId: { label: 'Officer ID', type: 'text' }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password || !credentials?.userType) {
          console.error('Missing credentials')

          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { officer: true }
        })

        if (!user) {
          console.error('User not found')

          return null
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password ?? '')

        if (!passwordMatch) {
          console.error('Invalid password for user:', user.email)

          return null
        }

        if (credentials.userType === 'OFFICER' && user.role === 'OFFICER') {
          if (!credentials.officerId || user.officer?.officerId !== credentials.officerId) {
            console.error('Invalid officer ID')

            return null
          }
        } else if (credentials.userType !== user.role) {
          console.error('User type mismatch')

          return null
        }

        console.log('User authenticated:', user)

        return {
          ...user,
          id: user.id.toString(),
          role: user.role,
          officerId: user.officer?.officerId
        }
      }
    })
  ],

  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
          officerId: token.officerId as string | undefined
        }
      }
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.officerId = user.officerId
      }

      return token
    }
  }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
