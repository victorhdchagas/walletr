import SubmitButtonAtom from '@components/atoms/buttons/submitbutton.atom'
import PageTitleMolecule from '@components/molecules/pagetitle.molecule'
import User from '@core/domain/entities/User.entity'
import Wallet from '@core/domain/entities/Wallet.entity'
import {
  Form,
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
} from 'react-router-dom'

export default function WalletPage() {
  const loaderData = useLoaderData() as { user: User; wallets: Wallet[] } | null
  const myWallets: Wallet[] = loaderData?.wallets || []
  const actionData = useActionData() as { error: string } | undefined
  const fetcher = useFetcher()
  return (
    <section className="overflow-y-auto max-h-screen">
      <PageTitleMolecule>Wallets</PageTitleMolecule>
      <div className="flex flex-row justify-evenly gap-4 pt-4 ">
        {myWallets.length > 0 && (
          <ul className="w-full max-w-[200px]">
            {myWallets.map((wallet) => (
              <li key={wallet.id} className="flex w-full justify-between">
                <Link to={`./${wallet.id}`}>{wallet.name}</Link>{' '}
                <fetcher.Form
                  action="/account/wallets"
                  method="post"
                  className="cursor-pointer hover:font-bold transition-all"
                >
                  <input type="hidden" name="walletId" value={wallet.id} />
                  <SubmitButtonAtom text="Delete" intent="delete" />
                </fetcher.Form>
              </li>
            ))}
          </ul>
        )}
        <Form
          method="post"
          replace
          className="flex flex-col items-center gap-2"
        >
          <input type="text" name="name" id="name" placeholder="Name" />
          <input
            type="hidden"
            name="userId"
            id="userId"
            value={loaderData?.user.id}
          />
          <SubmitButtonAtom text="Add" />
          <input type="reset" value="Reset" className="cursor-pointer" />
          {actionData?.error && (
            <p className="text-red-500">{actionData.error}</p>
          )}
        </Form>
      </div>
    </section>
  )
}
