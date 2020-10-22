import { CreateChallengeService } from '@modules/challenges/application/services/create-challenge.service';
import { CreateChallengeDto } from '@modules/challenges/domain/dto/create-challenge.dto';
import { Challenge } from '@modules/challenges/infra/persistence/typeorm/entities/challenge.entity';
import { HttpStatus } from '@shared/enums/http-status.enum';
import { Body, HttpCode, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';

@JsonController('/challenges')
export default class ChallengesController {
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateChallengeDto): Promise<Challenge> {
    const createChallenge = container.resolve(CreateChallengeService);

    const challenge = await createChallenge.execute(body);

    return challenge;
  }
}
