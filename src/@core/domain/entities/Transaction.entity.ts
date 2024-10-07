import Person from './Person.entity'

export default class Transaction {
  constructor(
    public id: string,
    public walletId: string,
    public name: string,
    public price: number,
    public targetId: string,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
    public target?: Person,
  ) {}

  static validate(data: unknown) {
    if (!data) return false
    if (typeof data !== 'object') return false
    if ('name' in data && typeof data['name'] !== 'string') return false
    if ('price' in data && typeof data['price'] !== 'number') return false
    if ('id' in data && typeof data['id'] !== 'string') return false
    if ('walletId' in data && typeof data['walletId'] !== 'string') return false
    // if ('target' in data && typeof data['target'] !== 'string') return false
    if ('description' in data && typeof data['description'] !== 'string')
      return false
    if ('createdAt' in data && !(data['createdAt'] instanceof Date))
      return false
    // if ('updatedAt' in data && typeof data['updatedAt'] !== 'string')
    //   return false
    return true
  }

  static createInstance(
    name: string,
    price: number,
    walletId: string,
    targetId: string = 'none',
    description: string = '',
    createdAt?: string | Date | undefined,
  ) {
    let newCreatedAt: Date
    if (typeof createdAt === 'string') {
      const dateFields = createdAt.split('/')
      newCreatedAt = new Date()
      newCreatedAt.setDate(Number(dateFields[0]))
      newCreatedAt.setMonth(Number(dateFields[1]) - 1)
      newCreatedAt.setFullYear(Number(dateFields[2]))
    } else if (createdAt instanceof Date) {
      newCreatedAt = createdAt
    } else {
      newCreatedAt = new Date()
    }
    return new Transaction(
      crypto.randomUUID(),
      walletId,
      name,
      price,
      targetId,
      description,
      newCreatedAt,
      new Date(),
    )
  }
}
