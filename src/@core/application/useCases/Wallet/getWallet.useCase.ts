import Wallet from 'src/@core/domain/entities/Wallet.entity'
import AsyncStorageInterfaceRepository from 'src/@core/infra/repositories/asyncStorageRepository.interface'

export default class getWalletUseCase {
  constructor(
    private readonly repository: AsyncStorageInterfaceRepository<Wallet>,
  ) {}
  async execute(id: string) {
    return this.repository.get(id)
  }
}
