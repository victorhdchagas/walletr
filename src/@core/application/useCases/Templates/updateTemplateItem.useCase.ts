import TemplateItem from '@core/domain/entities/TemplateItem.entity'
import TemplateRepositoryInterface from '@core/infra/repositories/Template/template.interface'

export default class UpdateTemplateItemUseCase {
  constructor(private readonly repository: TemplateRepositoryInterface) {}
  execute(templateId: string, input: Partial<TemplateItem>) {
    return this.repository.updateItem(templateId, input)
  }
}
