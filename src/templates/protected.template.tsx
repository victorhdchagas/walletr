import AsideMenuMolecule from '@components/molecules/asidemenu.molecule'
import { Outlet } from 'react-router-dom'

export default function ProtectedTemplate() {
  return (
    <div className="w-full container h-[calc(100vh-3rem)] bg-slate-800 text-gray-500 font-serif flex justify-between">
      <AsideMenuMolecule />
      <main className="flex-grow px-2">
        <Outlet />
      </main>
    </div>
  )
}
