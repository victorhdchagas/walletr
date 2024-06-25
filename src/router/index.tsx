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

export default function ReactRouterIndex() {
  const useCases = useCasesContext()
  const router = createBrowserRouter([
    {
      id: 'root',
      path: '/',
      //   async loader() {
      //     const user = await useCases.session.GetAuthenticatedUser.execute()
      //     console.log(user)
      //     return user ? { user } : null
      //   },
      Component: IndexTemplate,
      async loader() {
        const user = await myUseCases.session.GetAuthenticatedUser.execute()
        if (user) return { user }
        return null
      },
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
          children: [{ index: true, Component: DashboardPage }],
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
