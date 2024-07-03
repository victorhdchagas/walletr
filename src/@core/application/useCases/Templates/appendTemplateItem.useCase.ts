import TemplateItem, {
  TemplateItemTargetType,
} from '@core/domain/entities/TemplateItem.entity'
import TemplateRepositoryInterface from '@core/infra/repositories/Template/template.interface'

export default class AppendTemplateItemUseCase {
  constructor(private readonly repository: TemplateRepositoryInterface) {}
  execute(
    templateId: string,
    originName: string,
    category: string,
    targetName: string,
    targetType: TemplateItemTargetType,
  ) {
    const toAdd = new TemplateItem(
      crypto.randomUUID(),
      templateId,
      originName,
      category,
      targetName,
      targetType,
    )
    return this.repository.appendItem(templateId, toAdd)
  }
}
