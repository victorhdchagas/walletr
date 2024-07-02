import Session from '@core/domain/entities/Session.entity'
import SessionAsyncRepositoryInterface from './SessionAsyncRepository.interface'

export default class SessionLocalAsyncRepository
  implements SessionAsyncRepositoryInterface
{
  private key = 'SESSION_KEY'
  async getSession(token?: string | undefined): Promise<Session | null> {
    localStorage.getItem(this.key)
    const currentSession: Session | null = JSON.parse(
      localStorage.getItem(this.key) || 'null',
    )
    if (currentSession?.token === token) {
      return currentSession
    }

    return currentSession || null
  }
  async getCurrentToken(): Promise<string | null> {
    const currentSession: Session | null = JSON.parse(
      localStorage.getItem(this.key) || 'null',
    )
    if (currentSession) {
      return currentSession.token
    }
    return null
  }
  async create(input: { userId: string }): Promise<string> {
    //todo: 7 dias pra expirar
    const token = crypto.randomUUID()
    localStorage.setItem(
      this.key,
      JSON.stringify(
        new Session(
          token,
          crypto.randomUUID(),
          input.userId,
          new Date(),
          new Date(),
          new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
          null,
        ),
      ),
    )
    return token
  }
  async isValid(input: string): Promise<boolean> {
    const currentSession: Session | null = JSON.parse(
      localStorage.getItem(this.key) || 'null',
    )
    if (currentSession?.token === input) {
      currentSession.updatedAt = new Date()
      currentSession.expiresAt = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
      )
      localStorage.setItem(this.key, JSON.stringify(currentSession))
      return true
    }
    return false
  }
  async remove(): Promise<void> {
    localStorage.removeItem(this.key)
    return
  }
}
