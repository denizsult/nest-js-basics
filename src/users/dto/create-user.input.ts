import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsPhoneNumber, Length } from 'class-validator';
import { Unique } from 'typeorm';

@InputType()
@Unique(['email'])
export class CreateUserInput {
  @IsAlpha()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsPhoneNumber('TR')
  @Field()
  phone: string;

  @Length(6)
  @Field()
  password: string;

  @Field({ nullable: true })
  role?: string;
}
