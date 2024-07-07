import { myUseCases, useCasesContext } from '@contexts/useCases.context'
import IndexPage from '@pages/index.page'
import SignInPage from '@pages/login/signin.page'
import SignUpPage from '@pages/login/signup.page'
import IndexTemplate from '@templates/index.template'
import ProtectedTemplate from '@templates/protected.template'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import SignInAction from './actions/signIn.action'
import SignUpAction from './actions/signup.action'
import { getAuthenticatedLoader } from './loaders/getAuthenticated.Loader'
import { ProtectedLoader } from './loaders/protected.Loader'
import WalletRoutes from './wallets.route'
import ConfigRoutes from './configRoute/config.route'

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
            const user = await useCases.session.GetAuthenticatedUser.execute(
              localStorage.getItem('session') ?? '',
            )
            if (user) return redirect('/account')
            return null
          },
          action: SignInAction,
          Component: SignInPage,
        },
        {
          path: 'signup',
          async loader() {
            const user = await useCases.session.GetAuthenticatedUser.execute(
              localStorage.getItem('session') ?? '',
            )
            if (user) return redirect('/account')
            return null
          },
          action: SignUpAction,
          Component: SignUpPage,
        },
        {
          path: 'account',
          Component: ProtectedTemplate,
          loader: ProtectedLoader,
          ...WalletRoutes,
        },
        {
          path: 'config',
          Component: ProtectedTemplate,
          loader: ProtectedLoader,
          ...ConfigRoutes,
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
