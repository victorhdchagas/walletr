import Wallet from '@core/domain/entities/Wallet.entity'
import AsyncStorageInterfaceRepository from '@core/infra/repositories/asyncStorageRepository.interface'

export default class getWalletByPropertiesUseCase {
  constructor(
    private readonly repository: AsyncStorageInterfaceRepository<Wallet>,
  ) {}
  async execute(property: keyof Wallet, value: string) {
    return this.repository.getByProperty({ property, value })
  }
}
