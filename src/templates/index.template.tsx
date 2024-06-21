import NavbarMolecule from '@components/molecules/navbar.molecule'
import User from '@core/domain/entities/User.entity'
import { Outlet, useLoaderData } from 'react-router-dom'

export default function IndexTemplate() {
  const loaderData = useLoaderData() as { user: User } | null

  return (
    <main className="w-full container h-screen bg-slate-800 text-gray-500 font-serif px-4">
      <NavbarMolecule user={loaderData?.user} />
      <span className="w-full h-4 text-sm text-stone-500 flex justify-end">
        Welcome, {loaderData?.user?.email}
      </span>
      <Outlet />
    </main>
  )
}
