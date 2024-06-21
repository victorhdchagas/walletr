import Wallet from 'src/@core/domain/entities/Wallet.entity'
import AsyncStorageInterfaceRepository from 'src/@core/infra/repositories/asyncStorageRepository.interface'

export default class GetAllWalletUseCase {
  constructor(
    private readonly repository: AsyncStorageInterfaceRepository<Wallet>,
  ) {}
  async execute() {
    return this.repository.getAll() || []
  }
}
