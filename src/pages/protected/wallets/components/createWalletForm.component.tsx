import PortalMolecule from '@components/molecules/Portal.molecule'
import Wallet from '@core/domain/entities/Wallet.entity'
import { useLoaderData, useLocation } from 'react-router-dom'
import CreateWallet from './createWallet.component'

export default function CreateWalletForm() {
  const location = useLocation()
  const loadedData = useLoaderData() as { wallet?: Wallet; error?: string }
  const isFromLink = !!location.state
  return isFromLink ? (
    <PortalMolecule visible={true} onClose={() => history.back()}>
      <CreateWallet wallet={loadedData.wallet} />
    </PortalMolecule>
  ) : (
    <CreateWallet wallet={loadedData.wallet} />
  )
}
