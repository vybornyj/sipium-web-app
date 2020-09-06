import { withIronSession } from 'next-iron-session'

export const withSession = (handler) =>
  withIronSession(handler, {
    password: [{ id: 1, password: '#yR$a!ThGz!CNx160&!6W%&V0LM$RCF^QQ^6aEfsMlB9s7^8@O7MeLp2i2CL9%f3' }],
    cookieName: 'session'
  })
