import { myUseCases, useCasesContext } from '@contexts/useCases.context'
import DashboardPage from '@pages/protected/dashboard/index.page'
import IndexPage from '@pages/index.page'
import SignInPage from '@pages/login/signin.page'
import IndexTemplate from '@templates/index.template'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { ProtectedLoader } from './loaders/protected.Loader'
import SignInAction from './actions/signIn.action'
import SignUpAction from './actions/signup.action'
import SignUpPage from '@pages/login/signup.page'
import ProtectedTemplate from '@templates/protected.template'
import WalletPage from '@pages/protected/wallets/index.page'
import CreateWalletAction from './actions/wallets/create.wallet.action'
import { getAuthenticatedLoader } from './loaders/getAuthenticated.Loader'
import RemoveWalletAction from './actions/wallets/remove.wallet.action'
import WalletDetailsPage from '@pages/protected/wallets/details/index.page'
import UpdateTransactionAction from './actions/transactions/update.transaction.action'
import CreateTransactionAction from './actions/transactions/create.transaction.action'
import { formatTransactionToReturn, formatWalletToReturn } from '@lib/utils'

export default function ReactRouterIndex() {
  const useCases = useCasesContext()
  const router = createBrowserRouter([
    {
      id: 'root',
      path: '/',
      Component: IndexTemplate,
      loader: getAuthenticatedLoader,
      children: [
        {
          index: true,
          Component: IndexPage,
        },
        {
          path: 'signin',
          async loader() {
            const user = await useCases.session.GetAuthenticatedUser.execute()
            if (user) return redirect('/dashboard')
            return null
          },
          action: SignInAction,
          Component: SignInPage,
        },
        {
          path: 'signup',
          async loader() {
            const user = await useCases.session.GetAuthenticatedUser.execute()
            if (user) return redirect('/dashboard')
            return null
          },
          action: SignUpAction,
          Component: SignUpPage,
        },
        {
          path: 'account',
          Component: ProtectedTemplate,
          loader: ProtectedLoader,
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
                const wallet = await myUseCases.wallet.getById.execute(
                  params.walletId,
                )
                const transactionId = new URL(request.url).searchParams.get(
                  'transactionId',
                )
                if (transactionId) {
                  const transaction =
                    await myUseCases.wallet.getTransactionById.execute(
                      transactionId,
                    )
                  return {
                    wallet: formatWalletToReturn(wallet),
                    transaction: formatTransactionToReturn(transaction),
                  }
                }
                return { wallet: formatWalletToReturn(wallet) }
              },
              async action({ request, params }) {
                const formData = await request.formData()
                if (!params.walletId) return redirect('/account/wallets')
                if (request.method.toLowerCase() === 'delete') {
                  if (!formData.get('transactionId'))
                    return { error: 'Transaction not found' }
                  try {
                    await myUseCases.wallet.removeTransaction.execute(
                      params.walletId,
                      formData.get('transactionId') as string,
                    )
                  } catch (error) {
                    return { error }
                  }
                }
                if (request.method !== 'delete') {
                  const intent = formData.get('intent') as string
                  formData.delete('intent')
                  if (intent === 'update') {
                    await UpdateTransactionAction(formData)
                  } else if (intent === 'add') {
                    return await CreateTransactionAction(formData)
                  }
                }
                return redirect(`/account/wallets/${params.walletId}`)
              },
            },
          ],
        },
      ],
    },
    {
      path: 'logout',
      action: async () => {
        return await myUseCases.session.logout
          .execute()
          .then(() => redirect('/signin'))
      },
    },
  ])

  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  )
}
