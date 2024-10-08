import packageJson from '../../package.json'

import AppDetailsComponent from '@components/nativeComponent/packageJson.component'
import WhatsNewComponent from '@components/nativeComponent/whatsnew.component'

export default function IndexPage() {
  return (
    <div className="">
      My Wallet
      <AppDetailsComponent
        version={packageJson.version}
        name={packageJson.name}
      />
      <WhatsNewComponent version={packageJson.version} />
    </div>
  )
}
