import { CreateChallengeDto } from '@modules/challenges/domain/dto/create-challenge.dto';
import { IChallengesRepository } from '@modules/challenges/domain/interfaces/challenges-repository.interface';
import { IMarkdownProcessorProvider } from '@modules/challenges/domain/interfaces/markdown-processor-provider.interface';
import { Challenge } from '@modules/challenges/infra/persistence/typeorm/entities/challenge.entity';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateChallengeService {
  constructor(
    @inject('ChallengesRepository')
    private challengesRepository: IChallengesRepository,

    @inject('MarkdownProcessorProvider')
    private markdownProcessorProvider: IMarkdownProcessorProvider,
  ) {}

  async execute(
    data: CreateChallengeDto & { createdBy: string },
  ): Promise<Challenge> {
    const bodyHtml = await this.markdownProcessorProvider.toHTML(
      data.bodyMarkdown,
    );

    const challenge = await this.challengesRepository.create({
      ...data,
      bodyHtml,
    } as any);

    return challenge;
  }
}
