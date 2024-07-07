export default class WalletWithBalanceDTO {
  constructor(
    public id: string,
    public name: string,
    public balance: number,
    public created: Date,
    public count: number = 0,
  ) {}
}
