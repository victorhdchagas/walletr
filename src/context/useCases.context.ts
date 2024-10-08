import GetOrCreatePersonsByNameUseCase from '@core/application/useCases/Person/GetOrCreatePersonsByNameUseCase'
import AppendOrCreatePersonsUseCase from '@core/application/useCases/Person/appendOrCreatePerson.useCase'
import CreatePersonsUseCase from '@core/application/useCases/Person/createPerson.useCase'
import FillPersonInTransactionPersonsUseCase from '@core/application/useCases/Person/fillPersonInTransactionPerson.useCase'
import GetAllPersonsUseCase from '@core/application/useCases/Person/getAllPersons.useCase'
import SearchPersonsByNameUseCase from '@core/application/useCases/Person/searchPersonByName.useCase'
import AuthenticateUserUseCase from '@core/application/useCases/Session/authenticateUser.useCase'
import GetAuthenticatedUserUseCase from '@core/application/useCases/Session/getAuthenticatedUser.useCase'
import LogoutSessionUseCase from '@core/application/useCases/Session/logoutSession.useCase'
import SessionIsValidUserUseCase from '@core/application/useCases/Session/sessionIsValidUser.useCase'
import AppendTemplateItemUseCase from '@core/application/useCases/Templates/appendTemplateItem.useCase'
import CreateTemplateUseCase from '@core/application/useCases/Templates/createTemplate.useCase'
import GetTemplateUseCase from '@core/application/useCases/Templates/getTemplate.useCase'
import GetTemplateItemsUseCase from '@core/application/useCases/Templates/getTemplateItems.useCase'
import GetTemplateByUserUseCase from '@core/application/useCases/Templates/getTemplatesByUser.useCase'
import RemoveTemplateUseCase from '@core/application/useCases/Templates/removeTemplate.useCase'
import RemoveTemplateItemUseCase from '@core/application/useCases/Templates/removeTemplateItem.useCase'
import SetTemplateUseCase from '@core/application/useCases/Templates/setTemplate.useCase'
import UpdateTemplateItemUseCase from '@core/application/useCases/Templates/updateTemplateItem.useCase'
import RemoveTransactionUseCase from '@core/application/useCases/Transactions/RemoveTransaction.useCase'
import CreateOrUpdateTransactionUseCase from '@core/application/useCases/Transactions/createOrUpdateTransaction.useCase'
import CreateTransactionUseCase from '@core/application/useCases/Transactions/createTransaction.useCase'
import GetTransactionByIdUseCase from '@core/application/useCases/Transactions/getById.useCase'
import GetTransactionByWalletIdUseCase from '@core/application/useCases/Transactions/getByWalletId.useCase'
import CreateUserUseCase from '@core/application/useCases/User/createUser.useCase'
import GetUserUseCase from '@core/application/useCases/User/getUser.useCase'
import getUserByPropertyUseCase from '@core/application/useCases/User/getUserByProperty.useCase'
import AddWalletUseCase from '@core/application/useCases/Wallet/addWallet.useCase'
import getWalletUseCase from '@core/application/useCases/Wallet/getWallet.useCase'
import getWalletByPropertiesUseCase from '@core/application/useCases/Wallet/getWalletByProperties.useCase'
import RemoveWalletUseCase from '@core/application/useCases/Wallet/removeWallet.useCase'
import UpdateWalletUseCase from '@core/application/useCases/Wallet/updateWallet.useCase'
import PersonDexieRepository from '@core/infra/repositories/Person/personDexie.repository'
import SessionDexieRepository from '@core/infra/repositories/Session/SessionDexie.repository'
import TemplateDexieRepository from '@core/infra/repositories/Template/TemplateDexie.repository'
import TransactionDexieRepository from '@core/infra/repositories/Transaction/transactionDexie.repository'
import UserDexieRepository from '@core/infra/repositories/User/userDexie.repository'
import WalletDexieRepository from '@core/infra/repositories/Wallet/WalletDexie.repository'
import { createContext, useContext } from 'react'

const sessionDexieStorage = new SessionDexieRepository()
const walletDixieRepository = new WalletDexieRepository()
const transactionDexieRepository = new TransactionDexieRepository()
const personDexieStorage = new PersonDexieRepository()
const templateDexieRepository = new TemplateDexieRepository()
const userDexieStorage = new UserDexieRepository()
export const myUseCases = {
  templates: {
    create: new CreateTemplateUseCase(templateDexieRepository),
    getItems: new GetTemplateItemsUseCase(templateDexieRepository),
    set: new SetTemplateUseCase(templateDexieRepository),
    getByUserid: new GetTemplateByUserUseCase(templateDexieRepository),
    get: new GetTemplateUseCase(templateDexieRepository),
    remove: new RemoveTemplateUseCase(templateDexieRepository),
    appendItem: new AppendTemplateItemUseCase(templateDexieRepository),
    updateItem: new UpdateTemplateItemUseCase(templateDexieRepository),
    removeItem: new RemoveTemplateItemUseCase(templateDexieRepository),
  },
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
    update: new UpdateWalletUseCase(walletDixieRepository),
  },
  person: {
    getAll: new GetAllPersonsUseCase(personDexieStorage),
    searchByName: new SearchPersonsByNameUseCase(personDexieStorage),
    create: new CreatePersonsUseCase(personDexieStorage),
    appendOrCreate: new AppendOrCreatePersonsUseCase(personDexieStorage),
    getOrCreateByName: new GetOrCreatePersonsByNameUseCase(personDexieStorage),
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
