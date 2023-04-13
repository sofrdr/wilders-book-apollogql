import React, { useContext, useState } from 'react';
import { ImBin2 } from 'react-icons/im';
import ProfileImg from '../../assets/blank_profile.png';
import Skill from '../Skill/Skill';
import './Wilder.css';
import Iwilder from '../../utils/interfaces/IWilder';
import AddSkillForm from '../AddSkillForm/AddSkillForm';
import { WildersContext } from '../../utils/context/wildersContext';
import { gql, useMutation } from '@apollo/client';

export type WilderProps = Iwilder;

const DELETE_WILDER = gql`
  mutation deleteWilder($wilderId: Float!) {
    deleteWilder(wilderId: $wilderId)
  }
`;

const Wilder = ({ id, name, city, email, skills, image }: WilderProps) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const { fetchData } = useContext(WildersContext);

  const [deleteWilder] = useMutation(DELETE_WILDER);

  const onClickDelete = async (id: number) => {
    await deleteWilder({
      variables: { wilderId: id },
    });
    fetchData();
  };

  return (
    <article className="card">
      <img
        src={image !== undefined ? image : ProfileImg}
        alt={`${name} Profile`}
      />
      <h3>{name}</h3>
      <h4>{city}</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
        aspernatur veritatis ducimus neque, fuga explicabo, cum reprehenderit
        odit suscipit eveniet dolores. Odio deleniti eligendi quas praesentium
        sunt nihil possimus porro.
      </p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills?.map((skill) => {
          return <Skill key={skill.id} {...skill} wilderId={id} />;
        })}
      </ul>
      {isFormOpen ? (
        <AddSkillForm wilderId={id} toggleForm={toggleForm} />
      ) : (
        <button className="button" onClick={toggleForm}>
          Add a skill
        </button>
      )}

      <h4>Contact</h4>
      <p>{email}</p>
      <div onClick={() => onClickDelete(id)} className="delete-button">
        <ImBin2 />
      </div>
    </article>
  );
};

export default Wilder;
