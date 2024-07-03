import TemplateRepositoryInterface from '@core/infra/repositories/Template/template.interface'

export default class RemoveTemplateUseCase {
  constructor(private readonly repository: TemplateRepositoryInterface) {}
  execute(input: string) {
    return this.repository.remove(input)
  }
}
