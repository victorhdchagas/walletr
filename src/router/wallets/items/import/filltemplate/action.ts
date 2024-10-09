import { myUseCases } from '@contexts/useCases.context'
import Transaction from '@core/domain/entities/Transaction.entity'
import { formatCurrencyToNumber } from '@lib/utils'
import { RawTemplateItem } from '@pages/protected/wallets/imports/components/Table.component'
import { ActionFunction } from 'react-router-dom'

const FillTemplateAction: ActionFunction = async ({ request, params }) => {
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

      if (!file) throw new Error('Invalid file')
      if (!Array.isArray(file)) throw new Error('Invalid file')
      if (file.length === 0) throw new Error('Invalid file')

      const Targets = new Map<string, string>()
      for await (const item of file.filter(
        (item, index, self) =>
          self.findIndex((i) => i._target === item._target) === index,
      )) {
        if (!item._target) continue
        const target = await myUseCases.person.getOrCreateByName.execute(
          item._target?.toLocaleLowerCase(),
        )
        Targets.set(item._target, target.id)
      }
      for await (const item of file) {
        const transaction = Transaction.createInstance(
          item.name,
          typeof item.price === 'string'
            ? formatCurrencyToNumber(item.price)
            : item.price,
          params.walletId,
          Targets.get(item._target) || noneUser.id,
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
          console.error(
            'Not validated transaction',
            transaction.name,
            transaction.price,
          )
        }
      }
    } catch (error) {
      console.trace(error)
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
