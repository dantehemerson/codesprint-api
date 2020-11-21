import { CreateChallengeDto } from '@modules/challenges/domain/dto/create-challenge.dto';
import { IChallengesRepository } from '@modules/challenges/domain/interfaces/challenges-repository.interface';
import { IMarkdownProcessorProvider } from '@modules/challenges/domain/interfaces/markdown-processor-provider.interface';
import { Challenge } from '@modules/challenges/infra/persistence/typeorm/entities/challenge.entity';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindChallengesService {
  constructor(
    @inject('ChallengesRepository')
    private challengesRepository: IChallengesRepository,
  ) {}

  async execute(): Promise<Challenge[]> {
    const challenge = await this.challengesRepository.findAll();

    return challenge;
  }
}
