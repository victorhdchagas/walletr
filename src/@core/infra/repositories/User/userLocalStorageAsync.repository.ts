import AddRepositoryInterface from '../addRepository.interface'
import GetByPropertyRepositoryInterface from '../getByPropertyRepository.interface'
import GetRepositoryInterface from '../getRepository.interface'
import RemoveRepositoryInterface from '../removeRepository.interface'
import SetRepositoryInterface from '../setRepository.interface'

export default interface UserLocalStorageAsyncRepositoryInterface<T>
  extends AddRepositoryInterface<T>,
    GetRepositoryInterface<T & { id?: string | number }>,
    GetByPropertyRepositoryInterface<T>,
    SetRepositoryInterface<T>,
    RemoveRepositoryInterface<T & { id?: string | number }> {}
