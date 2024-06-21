import Session from '@core/domain/entities/Session.entity'

export default interface SessionAsyncRepositoryInterface {
  create(input: { userId: string }): Promise<void>
  isValid(input: string): Promise<boolean>
  remove(input: string): Promise<void>
  getCurrentToken(): Promise<string | null>
  getSession(token?: string): Promise<Session | null>
}
