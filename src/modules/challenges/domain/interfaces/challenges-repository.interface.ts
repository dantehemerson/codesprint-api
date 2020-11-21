import { Challenge } from '@modules/challenges/infra/persistence/typeorm/entities/challenge.entity';

export interface IChallengesRepository {
  findAll(): Promise<Challenge[]>;
  findById(id: string): Promise<Challenge | undefined>;
  deleteById(id: string): Promise<void>;
  create(data: Partial<Challenge>): Promise<Challenge>;
  save(user: Challenge): Promise<Challenge>;
}
