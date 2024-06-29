import Transaction from './Transaction.entity'

export default class Wallet {
  //   name: string
  //   id: string
  //   userId: string
  //   transactions: Transaction[]
  //   createdAt: Date
  //   updatedAt: Date
  constructor(
    public id: string,
    public name: string,
    public userId: string,
    public transactions: Transaction[] = [],
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  get balance() {
    console.log(
      'balance',
      this.transactions.reduce((acc, item) => acc + item.price, 0),
    )
    return this.transactions.reduce((acc, item) => acc + item.price, 0)
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction)
  }
}
