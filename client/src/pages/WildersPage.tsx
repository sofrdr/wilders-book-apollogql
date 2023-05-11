import React, { useContext } from 'react';
import AddWilderForm from '../components/AddWilderForm/AddWilderForm';
import WildersList from '../components/WildersList/WildersList';
import { AuthContext } from '../utils/context/authContext';
import { Link } from 'react-router-dom';

const WildersPage = () => {
   const { isAuthentificated } = useContext(AuthContext);
   return (
      <main className="container">
         {isAuthentificated ? (
            <>
               <WildersList />
               <AddWilderForm />
            </>
         ) : (
            <div>
               You have to be logged in to see this page, click{' '}
               <Link to="/sign-in">here</Link> to sign in.{' '}
            </div>
         )}
      </main>
   );
};

export default WildersPage;
