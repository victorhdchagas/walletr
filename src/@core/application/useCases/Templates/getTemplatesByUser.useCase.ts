import TemplateRepositoryInterface from '@core/infra/repositories/Template/template.interface'

export default class GetTemplateByUserUseCase {
  constructor(private readonly repository: TemplateRepositoryInterface) {}
  execute(userId: string) {
    return this.repository.getByUserId(userId)
  }
}
