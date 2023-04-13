import React, { useContext, useState } from 'react';
import ISkill from '../../utils/interfaces/ISkill';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './Skill.css';
import { WildersContext } from '../../utils/context/wildersContext';
import { gql, useMutation } from '@apollo/client';

export type SkillProps = ISkill & {
  wilderId: number;
};

const REMOVE_SKILL = gql`
  mutation RemoveSkill($skillId: Float!, $wilderId: Float!) {
    removeSkill(skillId: $skillId, wilderId: $wilderId)
  }
`;

const Skill = ({ name, id, wilderId }: SkillProps) => {
  const [isOver, setIsOver] = useState<boolean>(false);
  const { fetchData } = useContext(WildersContext);

  const [removeSkill] = useMutation(REMOVE_SKILL);

  const removeOnClick = async (skillId: number, wilderId: number) => {
    await removeSkill({
      variables: { skillId, wilderId },
    });
    fetchData();
  };

  return (
    <li
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      {name}
      <div
        className={isOver ? 'delete-btn' : 'hide'}
        onClick={() => removeOnClick(id, wilderId)}
      >
        <AiOutlineCloseCircle />
      </div>
    </li>
  );
};

export default Skill;
