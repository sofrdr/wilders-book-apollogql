import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Skill } from './Skill';
import { Field, ObjectType } from 'type-graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
@Entity()
export class Wilder {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column({ nullable: true })
  image: string;

  @Field(() => [Skill])
  @ManyToMany(() => Skill, (skill) => skill.wilders, {
    eager: true,
  })
  @JoinTable()
  skills: Skill[];
}
