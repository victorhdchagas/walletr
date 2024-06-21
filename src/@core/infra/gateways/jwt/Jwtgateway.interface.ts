export default interface JWTGatewayInterface<T> {
  generateToken(payload: T): string
  verifyToken(token: string): boolean
  getPayload(token: string): T
}
