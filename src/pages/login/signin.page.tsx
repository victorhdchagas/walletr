import {
  Form,
  Link,
  useActionData,
  useLocation,
  useNavigation,
} from 'react-router-dom'

export default function SignInPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const from = params.get('from') || '/dashboard'
  const navigation = useNavigation()
  const isLogginIn = navigation.formData?.get('email') != null
  const actionData = useActionData() as { error: string } | undefined
  return (
    <section>
      <h1 className="text-lg text-stone-200 font-semibold">Conecte-se</h1>
      <Form
        method="post"
        replace
        className="flex flex-col justify-start items-start gap-4 "
      >
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Email: <input name="email" />
        </label>
        <button
          type="submit"
          disabled={isLogginIn}
          className="shadow-md shadow-emerald-400 bg-emerald-500 hover:bg-emerald-600 text-stone-200 font-bold py-2 px-4 rounded"
        >
          {isLogginIn ? 'Autenticando...' : 'Autenticar'}
        </button>
        {actionData?.error && <p>{actionData.error}</p>}
      </Form>
      <span className="text-sm">
        Não possui cadastro? <Link to="/signup">Clique aqui</Link>
      </span>
    </section>
  )
}
