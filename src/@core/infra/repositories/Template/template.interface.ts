import Template from '@core/domain/entities/Template.entity'
import AddRepositoryInterface from '../addRepository.interface'
import TemplateItem from '@core/domain/entities/TemplateItem.entity'
import RemoveRepositoryInterface from '../removeRepository.interface'

export default interface TemplateRepositoryInterface
  extends AddRepositoryInterface<Template>,
    RemoveRepositoryInterface<Template> {
  appendItem(templateId: string, item: TemplateItem): Promise<void>
  updateItem(templateId: string, item: Partial<TemplateItem>): Promise<void>
  removeItem(templateId: string, itemId: string): Promise<void>
  getByUserId(userId: string): Promise<Template[]>
  get(templateId: string): Promise<Template | undefined>
  getItems(templateId: string): Promise<TemplateItem[]>
  set(
    templateId: string,
    template: Partial<Omit<Template, 'items'>>,
  ): Promise<void>
}
