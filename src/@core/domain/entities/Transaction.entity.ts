export default class Transaction {
  constructor(
    public id: string,
    public walletId: string,
    public name: string,
    public price: number,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
