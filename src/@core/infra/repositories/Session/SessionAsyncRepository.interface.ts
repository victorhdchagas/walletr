import Session from '@core/domain/entities/Session.entity'

export default interface SessionAsyncRepositoryInterface {
  create(input: { userId: string }): Promise<string>
  isValid(input: string): Promise<boolean>
  remove(input: string): Promise<void>
  getCurrentToken(input: string): Promise<string | null>
  getSession(token?: string): Promise<Session | null>
}
