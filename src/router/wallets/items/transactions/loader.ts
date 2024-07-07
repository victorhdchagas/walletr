import { myUseCases } from '@contexts/useCases.context'
import { formatTransactionToReturn, formatWalletToReturn } from '@lib/utils'
import { LoaderFunction, redirect } from 'react-router-dom'

const TransactionsLoader: LoaderFunction = async ({ request, params }) => {
  if (!params.walletId) return redirect('/account/wallets')
  const wallet = await myUseCases.wallet.getById.execute(params.walletId)
  if (!wallet) return redirect('/account/wallets')
  const walletTransactions = await myUseCases.transaction.getByWallet.execute(
    wallet.id,
  )
  const fullTransactons = await myUseCases.person.fillTransaction.execute(
    walletTransactions,
  )
  wallet.transactions = fullTransactons
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
