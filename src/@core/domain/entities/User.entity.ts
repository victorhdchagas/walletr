import Person from './Person.entity'

export default class User {
  constructor(
    public id: string,
    public email: string,
    public person?: Person,
  ) {}
}
