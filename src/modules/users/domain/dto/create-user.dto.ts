import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(2, { message: 'Username is too short' })
  @Matches(new RegExp('(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])'))
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
