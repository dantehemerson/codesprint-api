import { IChallengesRepository } from '@modules/challenges/domain/interfaces/challenges-repository.interface';
import { Challenge } from '@modules/challenges/infra/persistence/typeorm/entities/challenge.entity';
import { NotFoundError } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindChallengeService {
  constructor(
    @inject('ChallengesRepository')
    private challengesRepository: IChallengesRepository,
  ) {}

  async execute(id: string): Promise<Challenge> {
    const challenge = await this.challengesRepository.findById(id);
    if (!challenge) {
      throw new NotFoundError('Challenge not found');
    }
    return challenge;
  }
}
