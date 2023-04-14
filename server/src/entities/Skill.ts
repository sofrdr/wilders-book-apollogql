import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Wilder } from './Wilder';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Skill {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Wilder])
  @ManyToMany((type) => Wilder, (wilder) => wilder.skills)
  wilders: Wilder[];
}
