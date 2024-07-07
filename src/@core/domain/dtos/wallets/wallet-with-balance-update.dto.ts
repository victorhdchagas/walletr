import WalletWithBalanceDTO from './wallet-with-balance.dto'

export default class WalletWithBalanceUpdateDTO extends WalletWithBalanceDTO {
  constructor(
    id: string,
    name: string,
    balance: number,
    created: Date,
    public updated: Date,
    count: number = 0,
  ) {
    super(id, name, balance, created, count)
  }
}
