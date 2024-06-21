import UserLocalRepository from '../../../../@core/infra/repositories/User/userLocal.repository'
import 'jest-localstorage-mock'
import User from '../../../../@core/domain/entities/User.entity'
import GetUserUseCase from './getUser.useCase'
import CreateUserUseCase from './createUser.useCase'
let user: User
beforeEach(() => {
  user = new User(crypto.randomUUID(), 'email2@test.com')
})
test('Should create a user into db', async () => {
  const repository = new UserLocalRepository()
  const useCase = new GetUserUseCase(repository)
  const appendUseCase = new CreateUserUseCase(repository)

  await appendUseCase.execute(user)

  const data = await useCase.execute(user.id)
  expect(data).toHaveProperty('email', 'email2@test.com')
})
