import { Arg, Mutation, Query } from 'type-graphql';
import { Skill } from '../entities/Skill';
import appDataSource from '../utils';

export class SkillsResolver {
  @Query(() => [Skill])
  async getSkills(): Promise<Skill[]> {
    const skills = await appDataSource.getRepository(Skill).find();
    return skills;
  }

  @Mutation(() => Skill)
  async createSkill(@Arg('name') name: string): Promise<Skill> {
    const skillToCreate = new Skill();
    skillToCreate.name = name;
    return await appDataSource.getRepository(Skill).save(skillToCreate);
  }

  @Mutation(() => String)
  async deleteSkill(@Arg('skillId') skillId: number): Promise<string> {
    const skillToDelete = await appDataSource
      .getRepository(Skill)
      .findOneBy({ id: skillId });
    const { name } = skillToDelete!;
    await appDataSource.getRepository(Skill).delete(skillId);
    return `Skill ${name} has been deleted`;
  }

  @Mutation(() => Skill)
  async updateSkill(
    @Arg('skillId') skillId: number,
    @Arg('name') name: string
  ): Promise<Skill> {
    const skillToUpdate = await appDataSource
      .getRepository(Skill)
      .findOneBy({ id: skillId });
    appDataSource.getRepository(Skill).merge(skillToUpdate!, { name });
    return await appDataSource.getRepository(Skill).save(skillToUpdate!);
  }
}
