import SignInPage from '@pages/login/signin.page'
import { Route, Routes } from 'react-router-dom'

export default function LoginRoute() {
  return (
    <Routes location={{ pathname: '/signin' }}>
      <Route path="/" element={<SignInPage />} />
    </Routes>
  )
}
