import { IsEmail, IsString, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { PasswordInput } from '../shared/PasswordInput';
import { IsEmailAlreadyInUse } from './IsEmailAlreadyExist';

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @IsString()
  @Length(1, 255)
  firstName: string;

  @Field()
  @IsString()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyInUse({
    message: 'Email already in use.',
  })
  email: string;
}
