import OfflineDatabase from '@core/infra/database/offlinedatabase.database'
import TemplateRepositoryInterface from './template.interface'
import Template from '@core/domain/entities/Template.entity'
import TemplateItem from '@core/domain/entities/TemplateItem.entity'

export default class TemplateDexieRepository
  implements TemplateRepositoryInterface
{
  database!: OfflineDatabase
  constructor() {
    this.database = new OfflineDatabase()
  }
  getByUserId(userId: string): Promise<Template[]> {
    return this.database.templates.where('userId').equals(userId).toArray()
  }
  async appendItem(templateId: string, item: TemplateItem): Promise<void> {
    const template = await this.database.templates.get(templateId)
    if (!template) throw new Error('Template not found')
    await this.database.templates.update(templateId, {
      ...template,
      items: [...template.items, item],
    })
    return
  }
  async updateItem(
    templateId: string,
    item: Partial<TemplateItem>,
  ): Promise<void> {
    const template = await this.database.templates.get(templateId)
    if (!template) throw new Error('Template not found')
    const index = template.items.findIndex((i) => i.id === item.id)
    if (index < 0) throw new Error('Item not found')
    template.items[index] = { ...template.items[index], ...item }
    await this.database.templates.update(templateId, {
      ...template,
      items: [...template.items],
    })
    return
  }
  async removeItem(templateId: string, itemId: string): Promise<void> {
    const template = await this.database.templates.get(templateId)
    if (!template) throw new Error('Template not found')
    const index = template.items.findIndex((i) => i.id === itemId)
    if (index < 0) throw new Error('Item not found')

    template.items.splice(index, 1)
    await this.database.templates.update(templateId, {
      ...template,
      items: template.items,
    })
    return
  }
  async getItems(templateId: string): Promise<TemplateItem[]> {
    const template = await this.database.templates.get(templateId)
    if (!template) throw new Error('Template not found')
    return template.items
  }
  async add(input: Template): Promise<void> {
    await this.database.templates.add(input)
    return
  }
  async set(
    templateId: string,
    input: Partial<Omit<Template, 'items'>>,
  ): Promise<void> {
    await this.database.templates.update(templateId, input)
    return
  }
  async remove(input: string): Promise<void> {
    await this.database.templates.delete(input)
    return
  }
}
