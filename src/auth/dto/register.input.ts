import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Min } from 'class-validator';

@InputType()
export class RegisterInput {
  @IsEmail()
  @Field()
  email: string;

  @Min(6)
  @Field()
  password: string;
}
