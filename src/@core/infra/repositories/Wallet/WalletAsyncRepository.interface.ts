import Wallet from '@core/domain/entities/Wallet.entity'
import AsyncStorageInterfaceRepository from '../asyncStorageRepository.interface'
import AppendTransactionRepositoryInterface from './appendTransactionRepository.interface'
import Transaction from '@core/domain/entities/Transaction.entity'

export default interface WalletAsyncRepositoryInterface
  extends AsyncStorageInterfaceRepository<Wallet>,
    AppendTransactionRepositoryInterface<Transaction> {}
