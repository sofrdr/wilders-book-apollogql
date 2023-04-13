import { Arg, Mutation, Query } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { Wilder } from '../entities/Wilder';
import appDataSource from '../utils';
import { Skill } from '../entities/Skill';
import { validate } from 'class-validator';

export class WildersResolver {
  @Query(() => [Wilder])
  async getWilders(): Promise<Wilder[]> {
    const wilders = await appDataSource.getRepository(Wilder).find();
    return wilders;
  }

  @Query(() => Wilder)
  async getWilderById(@Arg('wilderId') wilderId: number): Promise<Wilder> {
    const wilder = await appDataSource
      .getRepository(Wilder)
      .findOneBy({ id: wilderId });
    return wilder!;
  }

  @Mutation(() => Wilder)
  async addWilder(
    @Arg('name') name: string,
    @Arg('city') city: string,
    @Arg('email') email: string
  ): Promise<Wilder | undefined> {
    const wilderToCreate = new Wilder();
    wilderToCreate.name = name;
    wilderToCreate.city = city;
    wilderToCreate.email = email;
    const errors = await validate(wilderToCreate);
    if (errors.length > 0) {
      console.log('validation failed. errors: ', errors);
      errors.map((error) => {
        if (error.property === 'email') {
          throw new GraphQLError('Email format is incorrect');
        }
      });
    } else {
      return await appDataSource.getRepository(Wilder).save(wilderToCreate);
    }
  }

  @Mutation(() => Wilder)
  async updateWilder(
    @Arg('wilderId') wilderId: number,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('city', { nullable: true }) city?: string,
    @Arg('email', { nullable: true }) email?: string
  ): Promise<Wilder> {
    const wilderToUpdate = await appDataSource
      .getRepository(Wilder)
      .findOneBy({ id: wilderId });
    appDataSource
      .getRepository(Wilder)
      .merge(wilderToUpdate!, { name, city, email });
    return await appDataSource.getRepository(Wilder).save(wilderToUpdate!);
  }

  @Mutation(() => String)
  async deleteWilder(@Arg('wilderId') wilderId: number): Promise<string> {
    const wilderToDelete = await appDataSource
      .getRepository(Wilder)
      .findOneBy({ id: wilderId });
    const { name } = wilderToDelete!;
    await appDataSource.getRepository(Wilder).delete(wilderId);
    return `Wilder ${name} has been deleted`;
  }

  @Mutation(() => Wilder)
  async addSkillToWilder(
    @Arg('wilderId') wilderId: number,
    @Arg('skillId') skillId: number
  ): Promise<Wilder> {
    const wilderToUpdate = await appDataSource
      .getRepository(Wilder)
      .findOneBy({ id: wilderId });

    const skillToAdd = await appDataSource
      .getRepository(Skill)
      .findOneBy({ id: skillId });
    wilderToUpdate?.skills.push(skillToAdd!);
    return await appDataSource.getRepository(Wilder).save(wilderToUpdate!);
  }

  @Mutation(() => String)
  async removeSkill(
    @Arg('wilderId') wilderId: number,
    @Arg('skillId') skillId: number
  ): Promise<string> {
    const wilderToUpdate = await appDataSource
      .getRepository(Wilder)
      .findOneBy({ id: wilderId });

    const skillToRemove = await appDataSource
      .getRepository(Skill)
      .findOneBy({ id: skillId });

    const { name } = skillToRemove!;

    const newSkills = wilderToUpdate?.skills.filter(
      (skill) => skill.id !== skillId
    );

    wilderToUpdate!.skills = newSkills!;
    await appDataSource.getRepository(Wilder).save(wilderToUpdate!);

    return `Skill ${name} has been removed from wilder`;
  }
}
