import Mail from 'nodemailer/lib/mailer'
import { IMailProvider, IMessage } from '../IMailProvider'
import nodemailer, { TransportOptions } from 'nodemailer'

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    } as TransportOptions)
  }
  async sendEmail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    })
  }
}
