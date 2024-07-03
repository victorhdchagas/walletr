export type TemplateItemTargetType =
  | 'date'
  | 'number'
  | 'string'
  | 'boolean'
  | 'personName'
export default class TemplateItem {
  createdAt!: Date
  constructor(
    public id: string,
    public templateId: string,
    public originName: string,
    public category: string,
    public targetName: string,
    public targetType: TemplateItemTargetType,
    createdAt?: Date,
  ) {
    this.createdAt = createdAt ?? new Date()
  }
}
