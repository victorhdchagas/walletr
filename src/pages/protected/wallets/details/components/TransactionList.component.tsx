import Transaction from '@core/domain/entities/Transaction.entity'
import { formatCurrency } from '@lib/utils'
import { Link, useFetcher, useLocation } from 'react-router-dom'

export default function ListTransactions({
  transactions,
}: {
  transactions: Transaction[]
}) {
  const location = useLocation()
  const fetcher = useFetcher()

  return (
    <table className="transition-all w-full text-left select-none">
      <thead>
        <tr className="">
          <th className="min-w-40">Name</th>
          <th className="min-w-24">Price</th>
          <th className="min-w-24">Target</th>
          <th className="w-full">Description</th>

          <th className="whitespace-nowrap min-w-32 ">Created At</th>
          <th className="whitespace-nowrap min-w-32 ">Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>
              <Link
                to={`./${transaction.id}`}
                state={{ backgroundLocation: location }}
              >
                {transaction.name}
              </Link>
            </td>
            <td>{formatCurrency(transaction.price)}</td>
            <td>{transaction.target?.name}</td>
            <td className="overflow-auto">{transaction.description}</td>
            <td>{transaction.createdAt.toLocaleDateString('pt-BR')}</td>
            <td>{transaction.updatedAt.toLocaleDateString('pt-BR')}</td>
            <td>
              <fetcher.Form
                method="delete"
                action={`/account/wallets/${
                  transaction.walletId
                }/transactions/${transaction.id || 'create'}`}
              >
                <button
                  type="submit"
                  name="transactionId"
                  value={transaction.id}
                >
                  Delete
                </button>
              </fetcher.Form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
