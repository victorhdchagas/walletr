import Transaction from '@core/domain/entities/Transaction.entity'
import Wallet from '@core/domain/entities/Wallet.entity'

export function formatCurrencyToNumber(currency: string): number {
  const isMinus =
    currency && currency.length > 0 ? currency.indexOf('-') >= 0 : false

  const toReturn = Number(
    currency
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(/[^\d.]/g, ''),
  )
  console.log(toReturn)
  return isMinus ? toReturn * -1 : toReturn
}
export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
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
