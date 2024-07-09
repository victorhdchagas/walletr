import Wallet from '@core/domain/entities/Wallet.entity'
import { formatCurrency } from '@lib/utils'
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom'
import Transaction from '@core/domain/entities/Transaction.entity'
import SessionHeaderMolecule from '@components/molecules/sessionHeader.molecule'
import { PlusSquare } from '@phosphor-icons/react'
import ListTransactions from './components/TransactionList.component'

export default function WalletDetailsPage() {
  const location = useLocation()
  const loaderData = useLoaderData() as {
    wallet: Wallet
    transaction?: Transaction
  }
  const wallet = loaderData.wallet

  //   const editingTransaction = loaderData!.transaction

  return (
    <section>
      <SessionHeaderMolecule title={wallet.name}>
        <Link
          to={`/account/wallets/${wallet.id}/transactions/create`}
          state={{ backgroundLocation: location }}
        >
          <PlusSquare
            size={32}
            className="text-emerald-400 cursor-pointer  rounded-md "
          />
        </Link>
      </SessionHeaderMolecule>
      <div className="flex flex-col justify-start items-start gap-4 h-fit flex-1 w-full">
        <table className="w-full border-collapse border-b-4 border-r-4 rounded-lg border-double border-emerald-500 mt-2 ">
          <thead>
            <tr>
              <td className="min-w-32">Balance</td>
              <td className="">Transactions</td>
              <td className="">Created</td>
              <td className="">Updated</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatCurrency(wallet.balance ?? 0)}</td>
              <td>{wallet.transactions.length}</td>
              <td>{wallet.createdAt.toLocaleDateString('pt-BR')}</td>
              <td>{wallet.updatedAt.toLocaleDateString('pt-BR')}</td>
            </tr>
            <tr className="h-4">
              <td colSpan={4}></td>
            </tr>
          </tbody>
        </table>
        {/* <AppendTransactionForm
          transaction={editingTransaction ?? { walletId: wallet.id }}
        /> */}
      </div>
      <Link to="/account/wallets">Back</Link>
      {wallet.transactions.length > 0 && (
        <>
          <ListTransactions transactions={wallet.transactions} />
          <Link to="/account/wallets">Back</Link>
        </>
      )}
      <Outlet />
    </section>
  )
}
