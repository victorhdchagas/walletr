import SubmitButtonAtom from '@components/atoms/buttons/submitbutton.atom'
import Transaction from '@core/domain/entities/Transaction.entity'
import { useEffect, useRef } from 'react'
import { Form, Link, useActionData, useNavigate } from 'react-router-dom'

export default function CreateTransaction({
  transaction,
}: {
  transaction: Partial<Transaction>
}) {
  const navigate = useNavigate()

  const actionData = useActionData() as
    | { error?: string; message?: string }
    | undefined
  useEffect(() => {
    if (actionData?.message) navigate(-1)
  }, [actionData, navigate])
  const { description, id, name, price, walletId, targetId, target } =
    transaction
  const ref = useRef<HTMLFormElement>(null)
  return (
    <Form
      method={id ? 'put' : 'post'}
      action={`/account/wallets/${walletId}/transactions/${id || 'create'}`}
      ref={ref}
      className="w-[400px] border-dashed border p-4 pt-4 rounded-r-lg shadow-2xl shadow-emerald-500 bg-slate-800 text-slate-400"
    >
      <span className="text-slate-500 text-lg">
        {id ? 'Edit' : 'Add'} Transaction
      </span>

      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" defaultValue={name} />

        <div className="flex flex-col gap-1"></div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          step={0.01}
          name="price"
          defaultValue={price ?? 0}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={description}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="target">Target</label>
        <input
          type="text"
          id="target"
          name="target"
          defaultValue={target?.name || 'none'}
        />
      </div>
      <input type="hidden" id="targetId" defaultValue={targetId} />
      <input
        type="hidden"
        id="walletId"
        name="walletId"
        defaultValue={walletId}
      />
      <input type="hidden" id="id" name="id" defaultValue={id} />

      <div className="flex flex-row w-full justify-evenly">
        <SubmitButtonAtom text={id ? 'Update' : 'Add'} />
        <Link to={`./`} onClick={() => ref?.current?.reset()}>
          reset
        </Link>
      </div>
    </Form>
  )
}
