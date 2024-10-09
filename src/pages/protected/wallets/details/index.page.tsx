import Wallet from '@core/domain/entities/Wallet.entity'
import { formatCurrency } from '@lib/utils'
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import Transaction from '@core/domain/entities/Transaction.entity'
import SessionHeaderMolecule from '@components/molecules/sessionHeader.molecule'
import { FileArrowDown, PlusSquare } from '@phosphor-icons/react'
import ListTransactions from './components/TransactionList.component'
import PortalMolecule from '@components/molecules/Portal.molecule'
import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import SearchMolecule from '@components/molecules/search.molecule'
import DateAtom from '@components/atoms/inputs/date.atom'

export default function WalletDetailsPage() {
  const [showModal, setShowModal] = useState(false)
  const [targetName, setTargetName] = useState<string>('')
  const [searchParams] = useSearchParams()
  const router = useNavigate()
  const printRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const loaderData = useLoaderData() as {
    wallet: Wallet
    transaction?: Transaction
  }
  const wallet = loaderData.wallet
  const transactionToList =
    targetName.length > 0
      ? wallet.transactions
          .filter(
            (transaction) =>
              transaction.target?.name === targetName.toLowerCase(),
          )
          .sort((t) => new Date(t.createdAt).getTime())
      : wallet.transactions

  const handleDownloadImage = async () => {
    const element = printRef.current
    if (!element) return
    element.classList.remove('max-h-[500px]')

    const canvas = await html2canvas(element)
    element.classList.add('max-h-[500px]')

    const data = canvas.toDataURL('image/jpg')
    const link = document.createElement('a')

    if (typeof link.download === 'string') {
      link.href = data
      link.download = `walletr ${targetName} ${wallet.name}.jpg`.toLowerCase()

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      window.open(data)
    }
  }

  return (
    <section className="overflow-auto h-full">
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
      <div className="h-10 w-fit flex gap-2 my-2">
        <button
          className="px-2 py-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-opacity-50 transition-colors"
          onClick={() => router('/account/wallets')}
        >
          Voltar
        </button>

        <div className="flex flex-col w-48">
          <span className="text-xs">Filtrar por nome</span>
          <select
            className="p-1 bg-slate-900 rounded-md focus:scale-125 transition-all"
            onChange={(e) => setTargetName(e.target.value)}
          >
            <option value="">Todas as transações</option>
            {wallet.transactions
              .map((transaction) => transaction.target?.name || 'none')
              .filter((name, index, self) => self.indexOf(name) === index)
              .map((targetName) => (
                <option key={targetName} value={targetName}>
                  {targetName}
                </option>
              ))}
          </select>
        </div>

        <button
          className="px-2 py-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-opacity-50 transition-colors disabled:cursor-not-allowed disabled:bg-slate-900 disabled:text-slate-600"
          disabled={transactionToList.length === 0 || targetName.length === 0}
          onClick={() => setShowModal(true)}
        >
          Gerar fatura
        </button>
      </div>
      <div>
        <SearchMolecule>
          <DateAtom
            name="start-date"
            defaultValue={
              searchParams.get('start-date') ||
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          />
          <DateAtom
            name="end-date"
            defaultValue={
              searchParams.get('end-date') ||
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
          />
        </SearchMolecule>
      </div>
      {wallet.transactions.length > 0 && (
        <>
          <ListTransactions transactions={transactionToList} />
          <Link to="/account/wallets">Back</Link>
        </>
      )}

      <PortalMolecule
        visible={showModal}
        onClose={() => setShowModal(false)}
        closeOnEscape
      >
        <div
          className="w-[400px] min-h-[600px] border-dashed border  pt-4 rounded-r-lg shadow-2xl  bg-slate-800 text-slate-400 flex flex-col  max-h-[500px]"
          ref={printRef}
        >
          <button
            type="button"
            className="fixed bottom-1 right-7 w-fit cursor-pointer rounded-full border-slate-400 border-2 p-2 bg-slate-600 hover:bg-slate-700"
            onClick={() => handleDownloadImage()}
          >
            <FileArrowDown className="h-12 w-12 " />
          </button>
          <section className="flex flex-row gap-4 justify-start text-2xl font-semibold items-baseline w-fit flex-nowrap px-4">
            {/* Section Header */}
            <img
              src="/walletr.svg"
              width="48"
              height="48"
              className="w-12 h-12"
            />
            <input
              type="text"
              defaultValue={wallet.name}
              className="border-none bg-slate-800 w-3/4"
            />
          </section>
          <section className="flex flex-col gap-2 flex-grow overflow-auto">
            {transactionToList.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-row gap-2  odd:bg-slate-900 px-2"
              >
                <div className="flex-grow text-wrap overflow-auto">
                  {transaction.name}
                </div>
                <div className="flex flex-col w-24 text-right flex-wrap">
                  <span>
                    {transaction.createdAt.toLocaleDateString('pt-BR', {
                      timeZone: 'America/sao_paulo',
                    })}
                  </span>
                  <span>{formatCurrency(transaction.price)}</span>
                </div>
              </div>
            ))}
          </section>
          <div className=" flex-1 w-full justify-end items-end flex max-h-8 text-right text-xl text-gray-200 flex-grow-0">
            Total:{' '}
            {formatCurrency(
              transactionToList.reduce((_prev, curr) => {
                return curr.price + _prev
              }, 0),
            )}
          </div>
          <section className="flex flex-grow-0 flex-1 items-center justify-center text-sm text-gray-500 max-h-8 py-1">
            Gerado por Walletr.victorhugo.info
          </section>
        </div>
      </PortalMolecule>
      <Outlet />
    </section>
  )
}
