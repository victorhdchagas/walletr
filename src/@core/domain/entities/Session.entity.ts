export default class Session {
  constructor(
    public readonly id: string,
    public readonly token: string,
    public readonly userId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public expiresAt: Date,
    public readonly info: unknown,
  ) {
    if (!id || id === '') this.id = crypto.randomUUID()
  }
}
