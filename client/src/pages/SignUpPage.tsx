import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
   const SIGN_UP_MUTATION = gql`
      mutation SignUp($password: String!, $email: String!) {
         signUp(password: $password, email: $email)
      }
   `;

   const [signUp] = useMutation(SIGN_UP_MUTATION);
   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email');
      const password = formData.get('password');
      const result = await signUp({ variables: { email, password } });
      const token = result.data.signUp;
      localStorage.setItem('token', token);
      navigate('/');
   };

   return (
      <main className="container">
         <h1>Sign Up</h1>
         <form onSubmit={handleSubmit}>
            <div className="field">
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@test.com"
               />
            </div>

            <div className="field">
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••••"
               />
            </div>

            <button type="submit" className="button">
               Sign Up
            </button>
         </form>

         <p>
            Already have an account? <Link to="/sign-in">Sign in</Link>
         </p>
      </main>
   );
};

export default SignUpPage;
