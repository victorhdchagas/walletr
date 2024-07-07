import Wallet from '@core/domain/entities/Wallet.entity'
import AsyncStorageInterfaceRepository from '@core/infra/repositories/asyncStorageRepository.interface'

export default class UpdateWalletUseCase {
  constructor(
    private readonly repository: AsyncStorageInterfaceRepository<Wallet>,
  ) {}
  execute(id: string, data: Partial<Wallet>) {
    return this.repository.set(id, data)
  }
}
