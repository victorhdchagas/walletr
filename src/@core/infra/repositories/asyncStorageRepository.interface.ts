import AddRepositoryInterface from './addRepository.interface'
import GetAllRepositoryInterface from './getAllRepository.interface'
import GetByPropertyRepositoryInterface from './getByPropertyRepository.interface'
import GetRepositoryInterface from './getRepository.interface'
import RemoveRepositoryInterface from './removeRepository.interface'
import SetRepositoryInterface from './setRepository.interface'

export default interface AsyncStorageInterfaceRepository<
  T extends { id?: string | number },
> extends AddRepositoryInterface<T>,
    GetRepositoryInterface<T>,
    GetAllRepositoryInterface<T>,
    GetByPropertyRepositoryInterface<T>,
    SetRepositoryInterface<T>,
    RemoveRepositoryInterface<T> {}
