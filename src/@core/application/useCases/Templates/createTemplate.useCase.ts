import Template from '@core/domain/entities/Template.entity'
import TemplateRepositoryInterface from '@core/infra/repositories/Template/template.interface'

export default class CreateTemplateUseCase {
  constructor(private readonly repository: TemplateRepositoryInterface) {}
  execute(name: string, userId: string, description: string) {
    const toAdd = Template.createInstance(name, userId, description)
    return this.repository.add(toAdd)
  }
}
