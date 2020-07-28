interface dbUserReport {
  userReportId?: number
  userId?: number
  cityName?: string
  cityId?: string
  birth?: Date
  personality?: Date
  name?: string
  sex?: boolean
  physActivity?: 1 | 1.2 | 1.375 | 1.55 | 1.725 | 1.9 | number
  height?: number
  weight?: number
  added?: Date
}

type dbUserReports = dbUserReport[]
