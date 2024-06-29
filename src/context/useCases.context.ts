import AuthenticateUserUseCase from '@core/application/useCases/Session/authenticateUser.useCase'
import GetAuthenticatedUserUseCase from '@core/application/useCases/Session/getAuthenticatedUser.useCase'
import LogoutSessionUseCase from '@core/application/useCases/Session/logoutSession.useCase'
import SessionIsValidUserUseCase from '@core/application/useCases/Session/sessionIsValidUser.useCase'
import CreateUserUseCase from '@core/application/useCases/User/createUser.useCase'
import GetUserUseCase from '@core/application/useCases/User/getUser.useCase'
import getUserByPropertyUseCase from '@core/application/useCases/User/getUserByProperty.useCase'
import GetWalletTransactionByIdUseCase from '@core/application/useCases/Wallet/GetWalletTransactionByIdUseCase'
import AddWalletUseCase from '@core/application/useCases/Wallet/addWallet.useCase'
import AppendTransactionToWalletUseCase from '@core/application/useCases/Wallet/appendTransactionToWallet.useCase'
import getWalletUseCase from '@core/application/useCases/Wallet/getWallet.useCase'
import getWalletByPropertiesUseCase from '@core/application/useCases/Wallet/getWalletByProperties.useCase'
import RemoveTransactionUseCase from '@core/application/useCases/Wallet/removeTransaction.useCase'
import RemoveWalletUseCase from '@core/application/useCases/Wallet/removeWallet.useCase'
import SessionLocalAsyncRepository from '@core/infra/repositories/Session/SessionLocalAsync.repository'
import UserLocalRepository from '@core/infra/repositories/User/userLocal.repository'
import WalletLocalStorageRepository from '@core/infra/repositories/Wallet/WalletAsync.repository'
import { createContext, useContext } from 'react'

const userStorage = new UserLocalRepository()
const sessionStorage = new SessionLocalAsyncRepository()
const walletStorage = new WalletLocalStorageRepository()
export const myUseCases = {
  user: {
    getUser: new GetUserUseCase(userStorage),
    getUserByProperty: new getUserByPropertyUseCase(userStorage),
    createUser: new CreateUserUseCase(userStorage),
  },
  session: {
    authenticateUser: new AuthenticateUserUseCase(sessionStorage, userStorage),
    sessionIsValidUser: new SessionIsValidUserUseCase(sessionStorage),
    logout: new LogoutSessionUseCase(sessionStorage),
    GetAuthenticatedUser: new GetAuthenticatedUserUseCase(
      sessionStorage,
      userStorage,
    ),
  },
  wallet: {
    add: new AddWalletUseCase(walletStorage),
    getByProperty: new getWalletByPropertiesUseCase(walletStorage),
    getById: new getWalletUseCase(walletStorage),
    remove: new RemoveWalletUseCase(walletStorage),
    removeTransaction: new RemoveTransactionUseCase(walletStorage),
    createOrEditTransaction: new AppendTransactionToWalletUseCase(
      walletStorage,
    ),
    getTransactionById: new GetWalletTransactionByIdUseCase(walletStorage),
  },
}
export const ContextUseCases = contextFactory()

function contextFactory() {
  return createContext(myUseCases)
}

export const useCasesContext = () => {
  return useContext(ContextUseCases)
}
