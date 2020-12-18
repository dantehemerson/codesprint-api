import { CreateUserService } from '@modules/users/application/services/create-user.service';
import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';
import { User } from '@modules/users/infra/persistence/typeorm/entities/user.entity';
import { HttpStatus } from '@shared/enums/http-status.enum';
import {
  Body,
  HttpCode,
  JsonController,
  Post,
  Patch,
  Param,
  Delete,
  OnUndefined,
  Get,
  Authorized,
} from 'routing-controllers';
import { container } from 'tsyringe';
import { UpdateUserDto } from '@modules/users/domain/dto/update-user.dto';
import { UpdateUserService } from '@modules/users/application/services/update-user.service';
import { DeleteUserService } from '@modules/users/application/services/delete-user.service';
import { FindUserService } from '@modules/users/application/services/find-user.service';
import { UserLoginService } from '@modules/users/application/services/user-login.service';
import { UserLoginDto } from '@modules/users/domain/dto/user-login.dto';
import { IUserLoginResponse } from '@modules/users/domain/interfaces/user-login-response.interface';
import { FindBy } from '@modules/users/domain/enums/find-by.enum';

@JsonController('/users')
export default class UsersController {
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @Body() body: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(body);

    /** Don't return hashed password for security */
    user.password = undefined as never;

    return user;
  }

  @Authorized()
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async find(
    @Param('id') id: string,
  ): Promise<Omit<User, 'password'> | undefined> {
    const findUser = container.resolve(FindUserService);

    const by = id.includes('-') ? FindBy.id : FindBy.username;

    const user = await findUser.execute(by, id);

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute(id, body);

    return user;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @OnUndefined(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  public async login(
    @Body() body: UserLoginDto,
  ): Promise<IUserLoginResponse | undefined> {
    const userLogin = container.resolve(UserLoginService);

    return userLogin.execute(body.email, body.password);
  }
}
