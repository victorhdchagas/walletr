export default class Person {
  constructor(public id: string, public name: string) {}

  static createInstance(name: string) {
    return new Person(crypto.randomUUID(), name)
  }
}
