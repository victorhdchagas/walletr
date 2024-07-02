import Session from '@core/domain/entities/Session.entity'
import SessionAsyncRepositoryInterface from './SessionAsyncRepository.interface'
import OfflineDatabase from '@core/infra/database/offlinedatabase.database'

export default class SessionDexieRepository
  implements SessionAsyncRepositoryInterface
{
  //   private key = 'SESSION_KEY'
  private database!: OfflineDatabase
  /**
   *
   */
  constructor() {
    this.database = new OfflineDatabase()
  }

  async getSession(token?: string | undefined): Promise<Session | null> {
    const toReturn = await this.database.sessions
      .where('token')
      .equals(token ?? '')
      .first()

    return toReturn ?? null
  }
  async getCurrentToken(input: string): Promise<string | null> {
    // const currentSession: Session | null = JSON.parse(
    //   localStorage.getItem(this.key) || 'null',
    // )
    // if (currentSession) {
    //   return currentSession.token
    // }
    const currentSession = await this.database.sessions.get({
      userId: input,
    })
    if (currentSession) {
      return currentSession.token
    }

    return null
  }
  async create(input: { userId: string }): Promise<string> {
    //todo: 7 dias pra expirar
    const token = crypto.randomUUID()
    await this.database.sessions.add(
      new Session(
        crypto.randomUUID(),
        token,
        input.userId,
        new Date(),
        new Date(),
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
        null,
      ),
    )
    return token
  }
  async isValid(): Promise<boolean> {
    // const currentSession: Session | null = JSON.parse(
    //   localStorage.getItem(this.key) || 'null',
    // )
    // if (currentSession?.token === input) {
    //   currentSession.updatedAt = new Date()
    //   currentSession.expiresAt = new Date(
    //     new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
    //   )
    //   localStorage.setItem(this.key, JSON.stringify(currentSession))
    //   return true
    // }
    return false
  }
  async remove(input: string): Promise<void> {
    await this.database.sessions
      .where({ userId: input })
      .or('token')
      .equals(input)
      .delete()
  }
}
