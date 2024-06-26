import Wallet from '@core/domain/entities/Wallet.entity'
import AsyncStorageInterfaceRepository from '@core/infra/repositories/asyncStorageRepository.interface'

export default class RemoveWalletUseCase {
  constructor(
    private readonly repository: AsyncStorageInterfaceRepository<Wallet>,
  ) {}
  async execute(key: string) {
    this.repository.remove(key)
  }
}
