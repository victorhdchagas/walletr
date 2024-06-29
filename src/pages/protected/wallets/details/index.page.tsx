import PageTitleMolecule from '@components/molecules/pagetitle.molecule'
import Wallet from '@core/domain/entities/Wallet.entity'
import { formatCurrency } from '@lib/utils'
import { Link, useLoaderData } from 'react-router-dom'
import AppendTransactionForm from './components/appendtransaction.form.component'
import ListTransactions from './components/listtransaction.component'
import Transaction from '@core/domain/entities/Transaction.entity'

export default function WalletDetailsPage() {
  const loaderData = useLoaderData() as {
    wallet: Wallet
    transaction?: Transaction
  } | null
  const wallet = loaderData!.wallet

  const editingTransaction = loaderData!.transaction

  return (
    <section>
      <PageTitleMolecule>{wallet.name}</PageTitleMolecule>
      <div className="flex flex-row justify-start items-start gap-4 h-fit">
        <table>
          <thead>
            <tr>
              <th className="min-w-32 text-left">Key</th>
              <th className="min-w-32 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="min-w-32">Balance</td>
              <td>{formatCurrency(wallet.balance ?? 0)}</td>
            </tr>
            <tr>
              <td>Transactions</td>
              <td>{wallet.transactions.length}</td>
            </tr>
            <tr>
              <td>Created</td>
              <td>{wallet.createdAt.toLocaleDateString('pt-BR')}</td>
            </tr>
            <tr>
              <td>Updated</td>
              <td>{wallet.updatedAt.toLocaleDateString('pt-BR')}</td>
            </tr>
          </tbody>
        </table>
        <AppendTransactionForm
          transaction={editingTransaction ?? { walletId: wallet.id }}
        />
      </div>
      <Link to="./..">Back</Link>
      {wallet.transactions.length > 0 && (
        <>
          <ListTransactions transactions={wallet.transactions} />
          <Link to="./..">Back</Link>
        </>
      )}
    </section>
  )
}
