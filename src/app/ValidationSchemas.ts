import { z } from 'zod'

const dateSchema = z.union([z.string().transform(str => new Date(str)), z.date()])

export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['ADMIN', 'OFFICER', 'NORMAL_USER']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']).optional()
})

export const officerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  picture: z.string().optional()
})

export const adminSchema = z.object({
  name: z.string().min(1, 'Name is required')
})

export const caseSchema = z.object({
  caseName: z.string().min(1, 'Case name is required'),
  Description: z.string().min(1, 'Description is required'),
  status: z.enum(['ACTIVE', 'CLOSED', 'IN_PROGRESS', 'PENDING']).default('PENDING')
})

export const caseOfficerSchema = z.object({
  caseId: z.string().uuid('Invalid case ID'),
  officerId: z.string().uuid('Invalid officer ID')
})

export const suspectSchema = z.object({
  nationality: z.string().min(1, 'Nationality is required'),
  address: z.string().min(1, 'Address is required'),

  caseId: z.string().min(1, 'Case is required'),

  maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed', 'Other']),
  associates: z.array(
    z.object({
      type: z.enum(['Family', 'Friend', 'Co-worker', 'Neighbor', 'Other']),
      relation: z.string().optional(),
      name: z.string().min(1, 'Name is required')
    })
  ),
  socialMedia: z.array(
    z.object({
      platform: z.string().min(1, 'Platform is required'),
      username: z.string().min(1, 'Username is required')
    })
  ),
  alibi: z.object({
    description: z.string().min(1, 'Alibi description is required'),
    location: z.string().min(1, 'Alibi location is required')
  }),

  // Personal Information
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  gender: z.string().min(1, 'Gender is required'),

  // Contact Information
  phoneNumber: z.string().min(1, 'Phone Number is required'),
  email: z.string().email('Invalid email address'),

  // Physical Characteristics
  height: z.string().min(1, 'Height is required'),
  weight: z.string().min(1, 'Weight is required'),
  hasDistinctiveFeatures: z.boolean(),
  distinctiveFeatures: z.string().optional(),

  // Biographical Information
  occupation: z.string().min(1, 'Occupation is required'),
  education: z.string().min(1, 'Education is required'),
  dependents: z.string(),

  // Criminal History
  hasCriminalHistory: z.boolean(),
  criminalHistory: z.string().optional(),

  // Social Connections
  socialMediaProfiles: z.string(),

  // Legal Documentation
  idNumbers: z.string(),

  // Incident-Specific Details
  relationshipToIncident: z.string(),
  alibisAndWitnesses: z.string(),

  // Additional Fields
  comments: z.string(),

  picture: z.string().min(1, 'Picture is required')
})

export const evidenceSchema = z.object({
  caseId: z.string().min(1, 'Case is required'),
  evidenceType: z.enum(['PHYSICAL', 'DIGITAL', 'DOCUMENTARY', 'TESTIMONIAL']),
  description: z.string().min(1, 'Description is required'),
  collectionDate: dateSchema,
  collectionLocation: z.string().min(1, 'Collection location is required'),
  collectedBy: z.string().min(1, 'Collector name is required'),
  chainOfCustody: z.array(
    z.object({
      date: dateSchema,
      handledBy: z.string().min(1, 'Handler name is required'),
      action: z.string().min(1, 'Action is required')
    })
  ),
  relatedSuspects: z.array(
    z.object({
      id: z.string(),
      name: z.string()

      // Add other necessary fields
    })
  ),
  storageLocation: z.string().min(1, 'Storage location is required'),
  notes: z.string(),
  images: z.array(z.string())
})
