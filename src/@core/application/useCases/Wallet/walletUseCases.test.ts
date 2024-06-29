import WalletLocalStorageRepository from '../../../infra/repositories/Wallet/WalletAsync.repository'
import AddWalletUseCase from './addWallet.useCase'
import Wallet from '../../../domain/entities/Wallet.entity'
import 'jest-localstorage-mock'
import RemoveWalletUseCase from './removeWallet.useCase'
import getWalletUseCase from './getWallet.useCase'
import GetAllWalletUseCase from './getAllWallet.useCase'
import Transaction from '../../../../@core/domain/entities/Transaction.entity'
import AppendTransactionToWalletUseCase from './appendTransactionToWallet.useCase'

let storage: WalletLocalStorageRepository
beforeAll(() => {
  storage = new WalletLocalStorageRepository()
})
test('Should test add Wallet useCase', async () => {
  const useCase = new AddWalletUseCase(storage)
  await useCase.execute(
    new Wallet('test', 'test', 'test', [], new Date(), new Date()),
  )
  const wallets = await storage.getAll()

  expect(wallets).toHaveLength(1)
})

test('should remove wallet', async () => {
  const useCase = new RemoveWalletUseCase(storage)
  const wallet = new Wallet(
    crypto.randomUUID(),
    'test',
    'test',
    [],
    new Date(),
    new Date(),
  )
  await useCase.execute(wallet.id)
  useCase.execute(wallet.id)

  const wallets = await storage.getAll()
  expect(wallets.find((w) => w.id === wallet.id)).toBeUndefined()
})

test('should get wallet', async () => {
  const useCase = new AddWalletUseCase(storage)
  const wallet = new Wallet(
    crypto.randomUUID(),
    'test',
    'test',
    [],
    new Date(),
    new Date(),
  )
  await useCase.execute(wallet)
  const savedWallet = await new getWalletUseCase(storage).execute(wallet.id)
  expect(savedWallet).toBeDefined()
  expect(savedWallet?.id).toBe(wallet.id)
})

test('should get all wallets', async () => {
  const useCase = new AddWalletUseCase(storage)
  const wallet = new Wallet(
    crypto.randomUUID(),
    'test',
    'test',
    [],
    new Date(),
    new Date(),
  )
  await useCase.execute(wallet)
  const wallets = await new GetAllWalletUseCase(storage).execute()
  expect(wallets).toBeDefined()
  expect(wallets.length).toBeGreaterThanOrEqual(0)
})

test('Should append transaction to Wallet', async () => {
  const useCase = new AddWalletUseCase(storage)
  const appendUseCase = new AppendTransactionToWalletUseCase(storage)

  const wallet = new Wallet(
    crypto.randomUUID(),
    'test',
    'test',
    [],
    new Date(),
    new Date(),
  )
  await useCase.execute(wallet)
  const transaction = new Transaction(
    crypto.randomUUID(),
    wallet.id,
    'test',
    50,
    'test',
    'test',
    new Date(),
    new Date(),
  )
  await appendUseCase.execute(transaction)

  const savedWallet = await new getWalletUseCase(storage).execute(wallet.id)
  expect(savedWallet?.transactions).toHaveLength(1)
  expect(savedWallet?.transactions[0].price).toEqual(transaction.price)
})
