import Template from '@core/domain/entities/Template.entity'
import TemplateRepositoryInterface from '@core/infra/repositories/Template/template.interface'

export default class SetTemplateUseCase {
  constructor(private readonly repository: TemplateRepositoryInterface) {}
  execute(templateId: string, input: Partial<Template>) {
    return this.repository.set(templateId, input)
  }
}
