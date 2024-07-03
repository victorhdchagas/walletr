import TemplateItem from './TemplateItem.entity'

export default class Template {
  constructor(
    public id: string,
    public userId: string,
    public name: string,
    public description: string,
    public items: TemplateItem[] = [],
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  static createInstance(name: string, userId: string, description: string) {
    return new Template(crypto.randomUUID(), userId, name, description)
  }
}
