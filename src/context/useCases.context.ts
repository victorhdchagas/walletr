import AppendOrCreatePersonsUseCase from '@core/application/useCases/Person/appendOrCreatePerson.useCase'
import CreatePersonsUseCase from '@core/application/useCases/Person/createPerson.useCase'
import FillPersonInTransactionPersonsUseCase from '@core/application/useCases/Person/fillPersonInTransactionPerson.useCase'
import GetAllPersonsUseCase from '@core/application/useCases/Person/getAllPersons.useCase'
import SearchPersonsByNameUseCase from '@core/application/useCases/Person/searchPersonByName.useCase'
import AuthenticateUserUseCase from '@core/application/useCases/Session/authenticateUser.useCase'
import GetAuthenticatedUserUseCase from '@core/application/useCases/Session/getAuthenticatedUser.useCase'
import LogoutSessionUseCase from '@core/application/useCases/Session/logoutSession.useCase'
import SessionIsValidUserUseCase from '@core/application/useCases/Session/sessionIsValidUser.useCase'
import RemoveTransactionUseCase from '@core/application/useCases/Transactions/RemoveTransaction.useCase'
import CreateOrUpdateTransactionUseCase from '@core/application/useCases/Transactions/createOrUpdateTransaction.useCase'
import CreateTransactionUseCase from '@core/application/useCases/Transactions/createTransaction.useCase'
import GetTransactionByIdUseCase from '@core/application/useCases/Transactions/getById.useCase'
import GetTransactionByWalletIdUseCase from '@core/application/useCases/Transactions/getByWalletId.useCase'
import CreateUserUseCase from '@core/application/useCases/User/createUser.useCase'
import GetUserUseCase from '@core/application/useCases/User/getUser.useCase'
import getUserByPropertyUseCase from '@core/application/useCases/User/getUserByProperty.useCase'
// import GetWalletTransactionByIdUseCase from '@core/application/useCases/Wallet/GetWalletTransactionByIdUseCase'
import AddWalletUseCase from '@core/application/useCases/Wallet/addWallet.useCase'
// import AppendTransactionToWalletUseCase from '@core/application/useCases/Wallet/appendTransactionToWallet.useCase'
import getWalletUseCase from '@core/application/useCases/Wallet/getWallet.useCase'
import getWalletByPropertiesUseCase from '@core/application/useCases/Wallet/getWalletByProperties.useCase'
// import RemoveTransactionUseCase from '@core/application/useCases/Wallet/removeTransaction.useCase'
import RemoveWalletUseCase from '@core/application/useCases/Wallet/removeWallet.useCase'
import PersonDexieRepository from '@core/infra/repositories/Person/personDexie.repository'
import SessionDexieRepository from '@core/infra/repositories/Session/SessionDexie.repository'
import TransactionDexieRepository from '@core/infra/repositories/Transaction/transactionDexie.repository'
// import SessionLocalAsyncRepository from '@core/infra/repositories/Session/SessionLocalAsync.repository'
import UserDexieRepository from '@core/infra/repositories/User/userDexie.repository'
// import UserLocalRepository from '@core/infra/repositories/User/userLocal.repository'
import WalletDexieRepository from '@core/infra/repositories/Wallet/WalletDexie.repository'
import { createContext, useContext } from 'react'

// const userStorage = new UserLocalRepository()
// const sessionStorage = new SessionLocalAsyncRepository()
const sessionDexieStorage = new SessionDexieRepository()
// const walletStorage = new WalletLocalStorageRepository()
const walletDixieRepository = new WalletDexieRepository()
const transactionDexieRepository = new TransactionDexieRepository()
// const personStorage = new PersonLocalStorageRepository()
const personDexieStorage = new PersonDexieRepository()
const userDexieStorage = new UserDexieRepository()
export const myUseCases = {
  user: {
    getUser: new GetUserUseCase(userDexieStorage),
    getUserByProperty: new getUserByPropertyUseCase(userDexieStorage),
    createUser: new CreateUserUseCase(userDexieStorage),
  },
  session: {
    authenticateUser: new AuthenticateUserUseCase(
      sessionDexieStorage,
      userDexieStorage,
    ),
    sessionIsValidUser: new SessionIsValidUserUseCase(sessionDexieStorage),
    logout: new LogoutSessionUseCase(sessionDexieStorage),
    GetAuthenticatedUser: new GetAuthenticatedUserUseCase(
      sessionDexieStorage,
      userDexieStorage,
    ),
  },
  transaction: {
    create: new CreateTransactionUseCase(transactionDexieRepository),
    remove: new RemoveTransactionUseCase(transactionDexieRepository),
    getByWallet: new GetTransactionByWalletIdUseCase(
      transactionDexieRepository,
    ),
    createOrUpdate: new CreateOrUpdateTransactionUseCase(
      transactionDexieRepository,
    ),
    getbyId: new GetTransactionByIdUseCase(transactionDexieRepository),
  },
  wallet: {
    add: new AddWalletUseCase(walletDixieRepository),
    getByProperty: new getWalletByPropertiesUseCase(walletDixieRepository),
    getById: new getWalletUseCase(walletDixieRepository),
    remove: new RemoveWalletUseCase(walletDixieRepository),
    // removeTransaction: new RemoveTransactionUseCase(walletDixieRepository),
    // createOrEditTransaction: new AppendTransactionToWalletUseCase(
    //   walletDixieRepository,
    // ),
    // getTransactionById: new GetWalletTransactionByIdUseCase(
    //   walletDixieRepository,
    // ),
  },
  person: {
    getAll: new GetAllPersonsUseCase(personDexieStorage),
    searchByName: new SearchPersonsByNameUseCase(personDexieStorage),
    create: new CreatePersonsUseCase(personDexieStorage),
    appendOrCreate: new AppendOrCreatePersonsUseCase(personDexieStorage),
    fillTransaction: new FillPersonInTransactionPersonsUseCase(
      personDexieStorage,
    ),
  },
}
export const ContextUseCases = contextFactory()

function contextFactory() {
  return createContext(myUseCases)
}

export const useCasesContext = () => {
  return useContext(ContextUseCases)
}
