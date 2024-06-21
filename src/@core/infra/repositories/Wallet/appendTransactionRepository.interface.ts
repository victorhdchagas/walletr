export default interface AppendTransactionRepositoryInterface<T> {
  appendTransaction(data: T): Promise<void>
}
