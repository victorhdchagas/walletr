import SessionHeaderMolecule from '@components/molecules/sessionHeader.molecule'
import WalletWithBalanceDTO from '@core/domain/dtos/wallets/wallet-with-balance.dto'
import User from '@core/domain/entities/User.entity'
import { PlusSquare } from '@phosphor-icons/react'
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom'
import WalletList from './components/WalletList.component'

export default function WalletPage() {
  const loaderData = useLoaderData() as {
    user: User
    wallets: WalletWithBalanceDTO[]
  } | null
  const location = useLocation()
  const myWallets: WalletWithBalanceDTO[] = loaderData?.wallets || []
  return (
    <section className="overflow-y-auto h-full flex flex-col">
      <SessionHeaderMolecule title="Carteiras">
        <Link
          to={`/account/wallets/create`}
          state={{ backgroundLocation: location }}
        >
          <PlusSquare
            size={32}
            className="text-emerald-400 cursor-pointer  rounded-md "
          />
        </Link>
      </SessionHeaderMolecule>
      <div className="flex flex-col  gap-4 pt-4 ">
        <WalletList wallets={myWallets} />
        <Outlet />
      </div>
    </section>
  )
}
