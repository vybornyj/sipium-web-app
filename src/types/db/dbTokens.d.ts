interface dbToken {
  tokenId?: number
  token?: string
  type?: string
  userId?: number
  email?: string
  password?: string
  added?: Date
}

type dbTokens = dbToken[]
