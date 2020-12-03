import { IChallengesRepository } from '@modules/challenges/domain/interfaces/challenges-repository.interface';
import { Challenge } from '@modules/challenges/infra/persistence/typeorm/entities/challenge.entity';
import { DeepPartial, getRepository, Repository } from 'typeorm';

export class ChallengesRepository implements IChallengesRepository {
  private ormRepository: Repository<Challenge>;

  constructor() {
    this.ormRepository = getRepository(Challenge);
  }

  async findAll(): Promise<Challenge[]> {
    return this.ormRepository
      .createQueryBuilder('challenge')
      .leftJoinAndSelect('challenge.createdBy', 'createdBy')
      .getMany();
  }

  async findById(id: string): Promise<Challenge | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: ['createdBy', 'categories'],
    });

    return user;
  }

  async create(data: DeepPartial<Challenge>): Promise<Challenge> {
    const user = await this.ormRepository.create(data);
    return this.save(user);
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  async save(user: Challenge): Promise<Challenge> {
    return this.ormRepository.save(user);
  }
}
