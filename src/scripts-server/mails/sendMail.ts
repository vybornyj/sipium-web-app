import nodemailer, { SentMessageInfo } from 'nodemailer'
import { Readable } from 'stream'

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

interface nodemailerMessage {
  from: string // 'Sender <sender@server.com>'
  to: string // 'receiver@sender.com'
  subject: string // 'Message title'
  text: string // 'Plaintext version of the message'
  html: string // '<p>HTML version of the message</p>'
  attachments?: {
    // https://nodemailer.com/message/attachments
    filename?: string
    content?: string | Buffer | Readable
    contentType?: 'text/plain'
    path?: string
  }[]
}
type errorCallback = (err: Error | null) => any
type successCallback = (info: SentMessageInfo) => any
type sendMail = (options: nodemailerMessage, errorCallback: errorCallback, successCallback: successCallback) => Promise<void>

export const sendMail: sendMail = async (options: nodemailerMessage, errorCallback, successCallback) => {
  await transport.sendMail(options, (err, info) => (err ? errorCallback(err) : successCallback(info)))
}

type verifySmtp = (errorCallback: errorCallback, successCallback: successCallback) => Promise<void>

export const verifySmtp: verifySmtp = async (errorCallback, successCallback) => {
  await transport.verify((err, suc) => (err ? errorCallback(err) : successCallback(suc)))
}
