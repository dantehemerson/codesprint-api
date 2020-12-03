import { CreateChallengeDto } from '@modules/challenges/domain/dto/create-challenge.dto';
import { IChallengesRepository } from '@modules/challenges/domain/interfaces/challenges-repository.interface';
import { IMarkdownProcessorProvider } from '@modules/challenges/domain/interfaces/markdown-processor-provider.interface';
import { Challenge } from '@modules/challenges/infra/persistence/typeorm/entities/challenge.entity';
import { CreateCategoryByTitleService } from '@modules/categories/application/services/create-categories.service';
import { container, inject, injectable } from 'tsyringe';

@injectable()
export class CreateChallengeService {
  constructor(
    @inject('ChallengesRepository')
    private readonly challengesRepository: IChallengesRepository,

    @inject('MarkdownProcessorProvider')
    private readonly markdownProcessorProvider: IMarkdownProcessorProvider,
  ) {}

  async execute(
    data: CreateChallengeDto & { createdBy: string },
  ): Promise<Challenge | null> {
    const createCategoriesService = container.resolve(
      CreateCategoryByTitleService,
    );

    const categories =
      data.categories.length > 0
        ? await createCategoriesService.execute(data.categories)
        : [];

    const bodyHtml = await this.markdownProcessorProvider.toHTML(
      data.bodyMarkdown,
    );

    const challenge = await this.challengesRepository.create({
      ...data,
      categories,
      bodyHtml,
    } as any);

    return challenge;
  }
}
