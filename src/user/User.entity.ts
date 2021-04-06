import bcrypt from 'bcrypt';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column()
  password: string;

  @Column({ default: false })
  confirmed: boolean;

  comparePassword(givenPassword: string) {
    return bcrypt.compare(givenPassword, this.password);
  }

  static hashPassword(givenPassword: string) {
    return bcrypt.hash(givenPassword, 12);
  }
}
