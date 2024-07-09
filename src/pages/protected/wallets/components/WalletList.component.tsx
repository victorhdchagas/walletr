import WalletWithBalanceDTO from '@core/domain/dtos/wallets/wallet-with-balance.dto'
import { formatCurrency } from '@lib/utils'
import { FileXls, MinusSquare, NotePencil } from '@phosphor-icons/react'
import { Link, useFetcher, useLocation } from 'react-router-dom'

export default function WalletList({
  wallets,
}: {
  wallets: WalletWithBalanceDTO[]
}) {
  const location = useLocation()
  const fetcher = useFetcher()
  return (
    <table className="transition-all w-full text-left select-none">
      <thead>
        <tr className="">
          <th className="min-w-40">Name</th>
          <th className="w-full">Balance</th>
          <th className="min-w-24">Count</th>
          <th className="whitespace-nowrap min-w-32 ">Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((wallet) => (
          <tr
            key={wallet.id}
            title={wallet.id}
            className="border-dashed border-b border-emerald-800 h-16  transition-all "
          >
            <td>
              <Link to={`./${wallet.id}/transactions`}>{wallet.name}</Link>
            </td>
            <td>{formatCurrency(wallet.balance)}</td>
            <td>{wallet.count}</td>
            <td>{wallet.created.toLocaleDateString('pt-BR')}</td>
            <td className="min-w-24 flex gap-2 justify-center items-center h-16 w-full">
              <Link
                to={`/account/wallets/${wallet.id}`}
                state={{ backgroundLocation: location }}
              >
                <NotePencil
                  size={26}
                  className="text-emerald-400 cursor-pointer  rounded-md hover:scale-110 transition-all"
                />
              </Link>
              <FileXls size={24} color="#1ce62e" weight="thin" />
              <fetcher.Form
                method="delete"
                action={`/account/wallets/${wallet.id}`}
              >
                <button type="submit">
                  <MinusSquare
                    size={26}
                    className="text-red-700 cursor-pointer  rounded-md hover:scale-110 transition-all"
                  />
                </button>
              </fetcher.Form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
