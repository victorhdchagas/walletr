import Transaction from '@core/domain/entities/Transaction.entity'
import Wallet from '@core/domain/entities/Wallet.entity'

export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatWalletToReturn(wallet?: Wallet | null) {
  if (!wallet) return null
  return {
    ...wallet,
    balance: wallet.balance ?? 0,
    createdAt: new Date(wallet.createdAt),
    updatedAt: new Date(wallet.updatedAt),
    transactions: wallet.transactions.map(formatTransactionToReturn),
  }
}

export function formatTransactionToReturn(transaction: Transaction | null) {
  if (!transaction) return null
  return {
    ...transaction,
    createdAt: new Date(transaction.createdAt),
    updatedAt: new Date(transaction.updatedAt),
  }
}
