import SubmitButtonAtom from '@components/atoms/buttons/submitbutton.atom'
import Transaction from '@core/domain/entities/Transaction.entity'
import { useRef } from 'react'
import { Form, Link, useSubmit } from 'react-router-dom'

export default function AppendTransactionForm({
  transaction,
}: {
  transaction: Partial<Transaction>
}) {
  const submit = useSubmit()
  const { description, id, name, price, walletId, target } = transaction
  const ref = useRef<HTMLFormElement>(null)
  return (
    <Form
      method="post"
      ref={ref}
      onSubmit={(e) => {
        // e.preventDefault()
        submit(e.currentTarget)
        setTimeout(() => ref.current?.reset(), 100)
      }}
      className={'flex flex-col gap-2 border-t '.concat(
        id ? 'border-orange-700 ' : ' border-emerald-700',
      )}
    >
      <span className="text-slate-500 text-lg">
        {id ? 'Edit' : 'Add'} Transaction
      </span>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" defaultValue={name} />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        step={0.01}
        name="price"
        defaultValue={price ?? 0}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        defaultValue={description}
      />
      <label htmlFor="target">Target</label>
      <input
        type="text"
        id="target"
        name="target"
        defaultValue={target ?? 'none'}
      />

      <input
        type="hidden"
        id="walletId"
        name="walletId"
        defaultValue={walletId}
      />
      <input type="hidden" id="id" name="id" defaultValue={id} />
      <SubmitButtonAtom
        text={id ? 'Update' : 'Add'}
        intent={id ? 'update' : 'add'}
      />
      <Link to={`./`} onClick={() => ref?.current?.reset()}>
        reset
      </Link>
    </Form>
  )
}
