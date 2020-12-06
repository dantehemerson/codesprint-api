import { IChallengesRepository } from '@modules/challenges/domain/interfaces/challenges-repository.interface';
import { Challenge } from '@modules/challenges/infra/persistence/typeorm/entities/challenge.entity';
import { Logger } from '@shared/infra/providers/logger.provider';
import { NotFoundError } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindChallengeService {
  constructor(
    @inject('ChallengesRepository')
    private challengesRepository: IChallengesRepository,

    @inject(Logger.name)
    private readonly logger: Logger,
  ) {}

  async execute(id: string): Promise<Challenge> {
    const challenge = await this.challengesRepository.findById(id);
    if (!challenge) {
      this.logger.error('Challenge not found', { id });
      throw new NotFoundError('Challenge not found');
    }
    return challenge;
  }
}
