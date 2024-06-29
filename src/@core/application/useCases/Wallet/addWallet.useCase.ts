import Wallet from '@core/domain/entities/Wallet.entity'
import AsyncStorageInterfaceRepository from '@core/infra/repositories/asyncStorageRepository.interface'

export default class AddWalletUseCase {
  constructor(
    private readonly repository: AsyncStorageInterfaceRepository<Wallet>,
  ) {}
  async execute(_wallet: { name: string; userId: string }) {
    const wallet = new Wallet(
      crypto.randomUUID(),
      _wallet.name,
      _wallet.userId,
      [],
    )
    this.repository.add(wallet)
  }
}
