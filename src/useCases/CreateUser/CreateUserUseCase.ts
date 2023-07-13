import { User } from '../../entities/User'
import { IMailProvider } from '../../providers/IMailProvider'
import { IUserRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository, private mailProvider: IMailProvider) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email)

    if (userAlreadyExists) throw new Error('User already exists')

    const user = new User(data)

    await this.userRepository.save(user)

    await this.mailProvider.sendEmail({
      to: {
        email: data.email,
        name: data.name,
      },
      from: {
        email: 'email@email.com',
        name: 'name',
      },
      subject: 'subject',
      body: 'body message',
    })
  }
}
