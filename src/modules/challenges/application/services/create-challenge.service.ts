import { CreateChallengeDto } from '@modules/challenges/domain/dto/create-challenge.dto';
import { IChallengesRepository } from '@modules/challenges/domain/interfaces/challenges-repository.interface';
import { Challenge } from '@modules/challenges/infra/persistence/typeorm/entities/challenge.entity';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateChallengeService {
  constructor(
    @inject('ChallengesRepository')
    private challengesRepository: IChallengesRepository,
  ) {}

  async execute(data: CreateChallengeDto): Promise<Challenge> {
    const challenge = await this.challengesRepository.create(data);

    return challenge;
  }
}
