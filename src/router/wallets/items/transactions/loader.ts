import { myUseCases } from '@contexts/useCases.context'
import { formatTransactionToReturn, formatWalletToReturn } from '@lib/utils'
import { LoaderFunction, redirect } from 'react-router-dom'

const TransactionsLoader: LoaderFunction = async ({ request, params }) => {
  if (!params.walletId) return redirect('/account/wallets')
  const wallet = await myUseCases.wallet.getById.execute(params.walletId)
  if (!wallet) return redirect('/account/wallets')

  const searchParams = new URL(request.url).searchParams
  const today = new Date()
  today.setDate(0)
  today.setDate(-5)
  const nextMonth = new Date()
  nextMonth.setMonth(today.getMonth() + 2)
  nextMonth.setDate(0)
  const filter = {
    startAt: today.toISOString().split('T')[0],
    endAt: nextMonth.toISOString().split('T')[0],
  }
  filter.endAt = searchParams.get('end-date')
    ? new Date(searchParams.get('end-date') as string)
        .toISOString()
        .split('T')[0]
    : filter.endAt

  filter.startAt = searchParams.get('start-date')
    ? (searchParams.get('start-date') as string)
    : filter.startAt

  const walletTransactions = await myUseCases.transaction.getByWallet.execute(
    wallet.id,
    new Date(filter.startAt),
    new Date(filter.endAt),
  )
  const fullTransactons = await myUseCases.person.fillTransaction.execute(
    walletTransactions,
  )
  if (request.url) wallet.transactions = fullTransactons
  const transactionId = new URL(request.url).searchParams.get('transactionId')
  if (transactionId) {
    const rawTransaction = await myUseCases.transaction.getbyId.execute(
      transactionId,
    )
    const transaction = await myUseCases.person.fillTransaction.execute([
      rawTransaction!,
    ])
    return {
      wallet: formatWalletToReturn(wallet),
      transaction: formatTransactionToReturn(transaction[0]),
    }
  }
  return { wallet: formatWalletToReturn(wallet) }
}

export default TransactionsLoader
