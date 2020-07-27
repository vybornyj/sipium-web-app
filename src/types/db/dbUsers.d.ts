interface dbUser {
  userId?: number
  isAdmin?: boolean
  email?: string
  password?: string
  added?: string
  updated?: string
}

type dbUsers = dbUser[]
