import TemplateRepositoryInterface from '@core/infra/repositories/Template/template.interface'

export default class GetTemplateItemsUseCase {
  constructor(private readonly repository: TemplateRepositoryInterface) {}
  execute(templateId: string) {
    return this.repository.getItems(templateId)
  }
}
