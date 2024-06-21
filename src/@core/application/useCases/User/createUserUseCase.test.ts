import UserLocalRepository from '../../../../@core/infra/repositories/User/userLocal.repository'
import 'jest-localstorage-mock'
// import Person from '../../../../@core/domain/entities/Person.entity'
import CreateUserUseCase from './createUser.useCase'
import User from '../../../../@core/domain/entities/User.entity'
let user: User
// let person: Person
beforeEach(() => {
  //   person = new Person(crypto.randomUUID(), 'john')
  user = new User(crypto.randomUUID(), 'email@test.com')
})
test('Should create a user into db', async () => {
  const repository = new UserLocalRepository()
  const useCase = new CreateUserUseCase(repository)

  await useCase.execute(user.email)
  expect(repository.get(user.id)).resolves.toHaveProperty(
    'email',
    'email@test.com',
  )
})

// test('Should create a user with person', async () => {
//   const repository = new UserLocalRepository()
//   const useCase = new CreateUserUseCase(repository)

//   await useCase.execute(user.email)

//   const data = await repository.get(user.id)
//   expect(data).toBeDefined()
//   expect(data).toHaveProperty('person', person)
//   expect(data?.person?.name).toEqual('john')
// })
