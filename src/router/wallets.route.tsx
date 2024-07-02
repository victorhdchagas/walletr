import DashboardPage from '@pages/protected/dashboard/index.page'
import WalletPage from '@pages/protected/wallets/index.page'
import { getAuthenticatedLoader } from './loaders/getAuthenticated.Loader'
import { myUseCases } from '@contexts/useCases.context'
import { formatTransactionToReturn, formatWalletToReturn } from '@lib/utils'
import RemoveWalletAction from './actions/wallets/remove.wallet.action'
import { RouteObject, redirect } from 'react-router-dom'
import CreateWalletAction from './actions/wallets/create.wallet.action'
import WalletDetailsPage from '@pages/protected/wallets/details/index.page'
import UpdateTransactionAction from './actions/transactions/update.transaction.action'
import CreateTransactionAction from './actions/transactions/create.transaction.action'

const WalletRoutes: { children: RouteObject[] } = {
  children: [
    { index: true, Component: DashboardPage },
    {
      path: 'wallets',
      Component: WalletPage,

      async loader() {
        const user = await getAuthenticatedLoader()
        const wallets = await myUseCases.wallet.getByProperty.execute(
          'userId',
          user?.user.id as string,
        )
        return { ...user, wallets: wallets?.map(formatWalletToReturn) }
      },
      async action(props) {
        const formData = await props.request.formData()
        const intent = formData.get('intent') as string
        if (intent === 'delete') {
          await RemoveWalletAction(formData)
          return redirect('/account/wallets')
        } else {
          return await CreateWalletAction(formData)
        }
      },
    },
    {
      path: '/account/wallets/:walletId',
      Component: WalletDetailsPage,
      async loader({ params, request }) {
        if (!params.walletId) return redirect('/account/wallets')
        const wallet = await myUseCases.wallet.getById.execute(params.walletId)
        if (!wallet) return redirect('/account/wallets')
        const walletTransactions =
          await myUseCases.transaction.getByWallet.execute(wallet.id)
        const fullTransactons = await myUseCases.person.fillTransaction.execute(
          walletTransactions,
        )
        wallet.transactions = fullTransactons
        const transactionId = new URL(request.url).searchParams.get(
          'transactionId',
        )
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
      },
      async action({ request, params }) {
        const formData = await request.formData()
        if (!params.walletId) return redirect('/account/wallets')
        const intent = formData.get('intent') as string

        if (request.method.toLowerCase() === 'delete') {
          if (!formData.get('transactionId'))
            return { error: 'Transaction not found' }
          try {
            await myUseCases.transaction.remove.execute(
              formData.get('transactionId') as string,
            )
          } catch (error) {
            return { error }
          }
        }
        if (request.method.toLowerCase() === 'post' && intent) {
          // Cadastrar usuario se não tiver targetId
          return myUseCases.person.appendOrCreate
            .execute(
              formData.get('target') as string,
              formData.get('targetId') as string,
            )
            .then((person) => {
              formData.set('targetId', person.id)
              formData.set('targetId', person.id)

              formData.delete('intent')

              if (intent === 'update') {
                return UpdateTransactionAction(formData)
              } else if (intent === 'add') {
                return CreateTransactionAction(formData)
              }
            })
        }
        return redirect(`/account/wallets/${params.walletId}`)
      },
    },
  ],
}

export default WalletRoutes
