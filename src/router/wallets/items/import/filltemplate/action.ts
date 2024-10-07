import { myUseCases } from '@contexts/useCases.context'
import Transaction from '@core/domain/entities/Transaction.entity'
import { formatCurrencyToNumber } from '@lib/utils'
import { RawTemplateItem } from '@pages/protected/wallets/imports/components/Table.component'
import { ActionFunction } from 'react-router-dom'

const FillTemplateAction: ActionFunction = async ({ request, params }) => {
  //   const formData = await request.formData()
  console.log('FillTemplateAction')
  if (!params.walletId) throw new Error('Invalid wallet')
  if (request.method.toLowerCase() === 'patch') {
    const formData = await request.formData()
    const stringFile = formData.get('file')
    try {
      const file = JSON.parse(stringFile as string) as RawTemplateItem[]
      const noneUser = await myUseCases.person.getOrCreateByName.execute('none')
      const currentTransactions =
        await myUseCases.transaction.getByWallet.execute(params.walletId)
      for await (const item of file) {
        const transaction = Transaction.createInstance(
          item.name,
          typeof item.price === 'string'
            ? formatCurrencyToNumber(item.price)
            : item.price,
          params.walletId,
          noneUser.id,
          item.description,
          item.createdAt,
        )
        if (Transaction.validate(transaction)) {
          const transactionFound = currentTransactions.some(
            (tran) =>
              tran.name === transaction.name &&
              transaction.createdAt.toDateString() ===
                tran.createdAt.toDateString() &&
              tran.price === transaction.price,
          )
          if (!transactionFound)
            await myUseCases.transaction.create.execute(transaction)
        } else {
          console.log(
            'Not validated transaction',
            transaction.name,
            transaction.price,
          )
        }
      }
    } catch (error) {
      if (typeof error === 'string') {
        return { error: error ? error : 'Invalid file' }
      } else {
        if (error instanceof Error)
          return { error: error ? error.message : 'Invalid file' }
        return { error: 'Invalid file' }
      }
    }
  }
  return { message: 'Arquivo importado com sucesso!' }
}

export default FillTemplateAction
