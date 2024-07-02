import Person from '@core/domain/entities/Person.entity'
import AddRepositoryInterface from '../addRepository.interface'
import GetAllRepositoryInterface from '../getAllRepository.interface'
import GetByPropertyRepositoryInterface from '../getByPropertyRepository.interface'
import GetRepositoryInterface from '../getRepository.interface'
import RemoveRepositoryInterface from '../removeRepository.interface'
import SetRepositoryInterface from '../setRepository.interface'

export default interface PersonRepositoryInterface
  extends AddRepositoryInterface<Person>,
    GetRepositoryInterface<Person & { id?: string | number }>,
    GetByPropertyRepositoryInterface<Person>,
    SetRepositoryInterface<Person>,
    GetAllRepositoryInterface<Person>,
    RemoveRepositoryInterface<Person & { id?: string | number }> {
  getByName(name: string): Promise<Person[] | undefined>
}
