import User from '@core/domain/entities/User.entity'
import { NavLink, useFetcher } from 'react-router-dom'

export default function NavbarMolecule({ user }: { user: User | undefined }) {
  const fetcher = useFetcher()
  return (
    <nav className="w-full h-8 flex justify-end gap-4 items-end ">
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isActive ? 'text-slate-200' : isPending ? 'text-slate-400' : ''
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive, isPending }) =>
          isActive ? 'text-slate-200' : isPending ? 'text-slate-400' : ''
        }
      >
        Dashboard
      </NavLink>
      {user && (
        <fetcher.Form method="post" action="/logout">
          {' '}
          <button type="submit">Logout</button>
        </fetcher.Form>
      )}

      {!user && (
        <NavLink
          to="/signin"
          className={({ isActive, isPending }) =>
            isActive ? 'text-slate-200' : isPending ? 'text-slate-400' : ''
          }
        >
          Login
        </NavLink>
      )}
    </nav>
  )
}
