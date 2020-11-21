import { CreateChallengeService } from '@modules/challenges/application/services/create-challenge.service';
import { FindChallengesService } from '@modules/challenges/application/services/find-challenges.service';
import { CreateChallengeDto } from '@modules/challenges/domain/dto/create-challenge.dto';
import { Challenge } from '@modules/challenges/infra/persistence/typeorm/entities/challenge.entity';
import { User } from '@modules/users/infra/persistence/typeorm/entities/user.entity';
import { HttpStatus } from '@shared/enums/http-status.enum';
import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  HttpCode,
  JsonController,
  Post,
} from 'routing-controllers';
import { container } from 'tsyringe';

@JsonController('/challenges')
export default class ChallengesController {
  @Authorized()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @CurrentUser({ required: true }) { id: createdBy }: User,
    @Body() body: CreateChallengeDto,
  ): Promise<Challenge> {
    const createChallenge = container.resolve(CreateChallengeService);

    const challenge = await createChallenge.execute({
      ...body,
      createdBy,
    });

    return challenge;
  }

  @Authorized()
  @HttpCode(HttpStatus.OK)
  @Get()
  public async find(): Promise<Challenge[]> {
    const findChallenges = container.resolve(FindChallengesService);

    const challenges = await findChallenges.execute();

    return challenges;
  }
}
