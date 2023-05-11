import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignInPage = () => {
   const SIGN_IN_MUTATION = gql`
      mutation SignIn($password: String!, $email: String!) {
         signIn(password: $password, email: $email)
      }
   `;

   const [signIn] = useMutation(SIGN_IN_MUTATION);
   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email');
      const password = formData.get('password');
      const result = await signIn({ variables: { email, password } });
      const token = result.data.signIn;
      localStorage.setItem('token', token);
      navigate('/');
   };

   return (
      <main className="container">
         <h1>Sign in</h1>
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
               Sign In
            </button>
         </form>

         <p>
            Don't have an account? <Link to="/sign-up">Sign up</Link>
         </p>
      </main>
   );
};

export default SignInPage;
