import Transaction from '@core/domain/entities/Transaction.entity'
import { formatCurrency } from '@lib/utils'
import { Link, useFetcher, useLocation } from 'react-router-dom'

export default function ListTransactions({
  transactions,
}: {
  transactions: Transaction[]
}) {
  const pathname = useLocation().pathname
  console.log(pathname)
  const fetcher = useFetcher()
  return (
    <div>
      <span>List of Transactions</span>
      <table>
        <thead>
          <tr>
            <th className="min-w-32 text-left">Name</th>
            <th className="min-w-32 text-left">Price</th>
            <th className="min-w-32 text-left">Target</th>
            <th className="min-w-32 text-left">Description</th>
            <th className="min-w-32 text-left">CreatedAt</th>
            <th className="min-w-32 text-left">UpdatedAt</th>
            <th className="min-w-32 text-left">#</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <Link to={`?transactionId=${transaction.id}`}>
                  {transaction.name}
                </Link>
              </td>
              <td>{formatCurrency(transaction.price)}</td>
              <td>{transaction.target}</td>
              <td>{transaction.description}</td>
              <td>{transaction.createdAt.toLocaleDateString('pt-BR')}</td>
              <td>{transaction.updatedAt.toLocaleDateString('pt-BR')}</td>
              <td>
                <fetcher.Form method="delete" action={pathname}>
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
    </div>
  )
}
