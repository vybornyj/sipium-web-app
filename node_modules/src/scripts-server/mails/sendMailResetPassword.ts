import { SentMessageInfo } from 'nodemailer'
import { mailHtmlBase } from 'src/scripts-server/mails/mailHtmlBase'
import { sendMail } from 'src/scripts-server/mails/sendMail'

interface props {
  to: string
  token: string
  errorCallback: (err: Error | null) => any
  successCallback: (info: SentMessageInfo) => any
}

export const sendMailResetPassword = async ({ to, token, errorCallback, successCallback }: props) => {
  const tokenUrl = `${process.env.URL_APP}/token/${token}`
  const from = `Sipium <${process.env.EMAIL_USER}>`
  const subject = 'Reset your Sipium password'

  const text = `
Hello,
 
We received a request to reset the password for the Sipium account associated with ${to}.

To reset your password, follow the link:

${tokenUrl}

If the request to reset the password did not come from you, it's okay!

Just ignore this email - everything will be alright with your account.

Thanks,

Sipium
`

  const html = mailHtmlBase(/* language=HTML4 */ `
<p style='font-size: 22px;'>Hello,</p>
<p style='font-size: 18px;'>We received a request to reset the password for the Sipium account associated with ${to}</p>
<p style='font-size: 22px;'>To reset your password, follow the link:</p>
<p style='font-size: 18px;'><a href='${tokenUrl}'>${tokenUrl}<a/></p>
<p style='font-size: 18px;'>&nbsp;</p>
<p style='font-size: 18px;'>If the request to reset the password did not come from you, it's okay!</p>
<p style='font-size: 18px;'>Just ignore this email - everything will be alright with your account.</p>
<p style='font-size: 18px;'>&nbsp;</p>
<p style='font-size: 18px;'>Thanks,</p>
<p style='font-size: 18px;'>Sipium</p>
`)

  await sendMail({ from, to, subject, text, html }, errorCallback, successCallback)
}
