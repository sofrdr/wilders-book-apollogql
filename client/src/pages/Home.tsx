import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/context/authContext';
import { useContext } from 'react';

const Home = () => {
   const { userAccount } = useContext(AuthContext);

   return (
      <main className="container">
         <h1>Welcome to crew Lamarr ! </h1>

         {userAccount ? (
            <>
               <p>You are currently logged in with email : {userAccount}</p>
               <p>
                  Click <Link to="/wilders">here</Link> to see all the wilders !
               </p>
            </>
         ) : (
            <div>
               Please <Link to="/sign-up">sign up</Link> to see all the wilders
            </div>
         )}
      </main>
   );
};

export default Home;
