import TitleAtom from '@components/atoms/labels/title.atom'
import { NavLink } from 'react-router-dom'

export default function AsideMenuMolecule() {
  return (
    <aside className="max-w-64 border-dashed border-r border-slate-500 flex-grow-0 px-4 flex flex-col gap-2 justify-start items-start ">
      <TitleAtom>Walletr</TitleAtom>
      <ul>
        <li>
          <NavLink
            to="/account"
            className={({ isActive, isPending }) =>
              isActive ? 'text-slate-200' : isPending ? 'text-slate-400' : ''
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/wallets"
            className={({ isActive, isPending }) =>
              isActive ? 'text-slate-200' : isPending ? 'text-slate-400' : ''
            }
          >
            My wallets
          </NavLink>
        </li>

        <li className="hidden">
          <NavLink
            to="/account/transactions"
            className={({ isActive, isPending }) =>
              isActive ? 'text-slate-200' : isPending ? 'text-slate-400' : ''
            }
          >
            Transactions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/config/templates"
            className={({ isActive, isPending }) =>
              isActive ? 'text-slate-200' : isPending ? 'text-slate-400' : ''
            }
          >
            Templates
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/config/persons"
            className={({ isActive, isPending }) =>
              isActive ? 'text-slate-200' : isPending ? 'text-slate-400' : ''
            }
          >
            Persons
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}
