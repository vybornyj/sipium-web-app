import { calcDateUtc } from 'src/scripts-server/@vybornyj/input-to-utc/calcDateUtc'
import { userReportsInsert } from 'src/scripts-server/db/userReportsInsert'
import { userReportsSelectUserReportId } from 'src/scripts-server/db/userReportsSelectUserReportId'
import { usersInsert } from 'src/scripts-server/db/usersInsert'
import { usersSelect } from 'src/scripts-server/db/usersSelect'

type funcAddReport = (data: {
  email: dbUser['email']
  cityName: dbUserReport['cityName']
  cityId: dbUserReport['cityId']
  birth: string
  name: dbUserReport['name']
  sex: dbUserReport['sex']
  physActivity: dbUserReport['physActivity']
  height: dbUserReport['height']
  weight: dbUserReport['weight']
}) => Promise<{
  userReportId: dbUserReport['userReportId']
  userId: dbUser['userId']
  isAdmin: dbUser['isAdmin']
}>

export const funcAddReport: funcAddReport = async data => {
  const { email, cityId, birth, ...otherReportData } = data
  const personality = await calcDateUtc(process.env.API_KEY_GOOGLE, process.env.API_KEY_TIMEZONE_DB, cityId, birth)

  // нахожу пользователя
  const selectedUser = await usersSelect(email)

  let userId: dbUser['userId']
  let isAdmin: dbUser['isAdmin']
  let userReportId: dbUserReport['userReportId']

  if (selectedUser.userId) {
    // пользователь существует
    userId = selectedUser.userId
    isAdmin = selectedUser.isAdmin
    // нахожу userReportId последнего добавленного репорта
    const _userReportId = await userReportsSelectUserReportId(userId)
    userReportId = _userReportId ? _userReportId + 1 : 1
  } else {
    // пользователь не существует - добавляю пользователя
    userId = await usersInsert(email)
    isAdmin = false
    userReportId = 1
  }

  if (userId && userReportId) {
    // добавляю чарт в БД
    const success = userReportsInsert({ userReportId, userId, personality, cityId, birth, ...otherReportData })

    if (success) {
      return { userReportId, userId, isAdmin }
    }
  }

  return { userReportId: null, userId: null, isAdmin: null }
}
