import PortalMolecule from '@components/molecules/Portal.molecule'
import { useLoaderData, useLocation, useParams } from 'react-router-dom'
import CreateTransaction from './createTransaction.component'
import Transaction from '@core/domain/entities/Transaction.entity'

export default function CreateTransactionForm() {
  const location = useLocation()
  const params = useParams()
  const loadedData = useLoaderData() as {
    transaction?: Transaction
    error?: string
  }
  const isFromLink = !!location.state
  return isFromLink ? (
    <PortalMolecule visible={true} onClose={() => history.back()}>
      <CreateTransaction
        transaction={loadedData.transaction ?? { walletId: params.walletId }}
      />
    </PortalMolecule>
  ) : (
    <CreateTransaction
      transaction={loadedData.transaction ?? { walletId: params.walletId }}
    />
  )
}
