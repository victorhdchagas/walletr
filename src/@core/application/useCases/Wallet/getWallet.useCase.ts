import Wallet from '@core/domain/entities/Wallet.entity'
import AsyncStorageInterfaceRepository from '@core/infra/repositories/asyncStorageRepository.interface'

export default class getWalletUseCase {
  constructor(
    private readonly repository: AsyncStorageInterfaceRepository<Wallet>,
  ) {}
  async execute(id: string) {
    return this.repository.get(id)
  }
}
