import ErrorAtom from '@components/atoms/labels/error.atom'
import Wallet from '@core/domain/entities/Wallet.entity'
import { useEffect } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'

export default function CreateWallet({ wallet }: { wallet?: Partial<Wallet> }) {
  const navigate = useNavigate()
  const action = wallet?.id ? 'Edit' : 'Create'

  const actionData = useActionData() as
    | { error?: string; message?: string }
    | undefined
  useEffect(() => {
    if (actionData?.message) navigate(-1)
  }, [actionData, navigate])

  return (
    <Form
      method={wallet?.id ? 'put' : 'post'}
      action={`/account/wallets/${wallet?.id || 'create'}`}
      className="w-[400px] border-dashed border p-4 pt-4 rounded-r-lg shadow-2xl shadow-emerald-500 bg-slate-800 text-slate-400"
    >
      <h1 className="font-semibold text-sm text-slate-500 select-none">
        {action} Wallet Form
      </h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="w-full">
          Name
        </label>
        <input type="text" name="name" defaultValue={wallet?.name || ''} />
      </div>
      <input type="hidden" name="id" defaultValue={wallet?.id} />
      <ErrorAtom>{actionData?.error}</ErrorAtom>
      <div className="flex flex-row w-full justify-evenly">
        <button type="submit">{action}</button>
        <button type="reset">Reset</button>
      </div>
    </Form>
  )
}
