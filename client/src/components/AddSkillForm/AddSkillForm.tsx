import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { WildersContext } from '../../utils/context/wildersContext';
import ISkill from '../../utils/interfaces/ISkill';
import './AddSkillForm.css';
import { gql, useMutation, useQuery } from '@apollo/client';

type AddSkillFormProps = {
  wilderId: number;
  toggleForm: () => void;
};

const GET_SKILLS = gql`
  query getSkills {
    getSkills {
      name
      id
    }
  }
`;

const ADD_SKILL_TO_WILDER = gql`
  mutation addSkillToWilder($skillId: Float!, $wilderId: Float!) {
    addSkillToWilder(skillId: $skillId, wilderId: $wilderId) {
      name
      email
      city
      skills {
        id
        name
      }
    }
  }
`;

const AddSkillForm = ({ wilderId, toggleForm }: AddSkillFormProps) => {
  // Get fetchData function from context
  const { fetchData } = useContext(WildersContext);

  const { data } = useQuery(GET_SKILLS);

  const skillsList: ISkill[] = data?.getSkills || [];

  // Function to add a specific skill to a wilder
  const [addSkillToWilder] = useMutation(ADD_SKILL_TO_WILDER);

  const addSkill = async (skillId: number, wilderId: number) => {
    await addSkillToWilder({
      variables: { skillId, wilderId },
    });
    fetchData();
  };

  interface IFormInput {
    skill: number;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  // When the form is submitted
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { skill } = data;

    addSkill(Number(skill), wilderId);
    toggleForm();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-skill-form">
      <label>Select a skill :</label>
      <select {...register('skill')}>
        {skillsList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="form-buttons">
        <button type="submit" className="button">
          Submit
        </button>
        <button className="button" onClick={toggleForm}>
          Close
        </button>
      </div>
    </form>
  );
};

export default AddSkillForm;
