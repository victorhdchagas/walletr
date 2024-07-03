import TemplateRepositoryInterface from '@core/infra/repositories/Template/template.interface'

export default class RemoveTemplateItemUseCase {
  constructor(private readonly repository: TemplateRepositoryInterface) {}
  execute(templateId: string, itemId: string) {
    return this.repository.removeItem(templateId, itemId)
  }
}
