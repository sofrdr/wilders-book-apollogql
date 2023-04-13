import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { WildersContext } from '../../utils/context/wildersContext';
import './AddWilderForm.css';
import { gql, useMutation } from '@apollo/client';

type Inputs = {
  name: string;
  city: string;
  email: string;
  image?: string;
};

const ADD_WILDER = gql`
  mutation AddWilder($email: String!, $city: String!, $name: String!) {
    addWilder(email: $email, city: $city, name: $name) {
      name
      email
      city
    }
  }
`;

const AddWilderForm = () => {
  const [errorMsg, setErrorMsg] = useState<String>('');

  const { fetchData } = useContext(WildersContext);

  const [addWilder] = useMutation(ADD_WILDER);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      city: '',
      email: '',
      image: '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, city, email } = data;
    await addWilder({
      variables: { name, city, email },
    });
    fetchData();
    reset();
  };

  return (
    <section className="form-container">
      <h2>Add a wilder</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <div className="form-input">
            <label>Name</label>
            <input {...register('name', { required: true })} />
            {errors.name && <div className="error-msg">Name is required</div>}
          </div>

          <div className="form-input">
            <label>Email</label>
            <input type="email" {...register('email', { required: true })} />
            {errors.email && <div className="error-msg">Email is required</div>}
          </div>

          <div className="form-input">
            <label>City</label>
            <input {...register('city')} />
          </div>
          <div className="form-input">
            <label>Avatar</label>
            <input type="file" {...register('image')} />
          </div>
        </div>
        {errorMsg && <div className="error-msg">{errorMsg}</div>}
        <br />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddWilderForm;
