import { IsString, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class PasswordInput {
  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}
