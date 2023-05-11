import { gql, useQuery } from '@apollo/client';
import { PropsWithChildren, createContext } from 'react';

interface AuthContextProps {
   isAuthentificated: boolean;
   userAccount: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
   isAuthentificated: false,
   userAccount: '',
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
   let isAuthentificated = false;
   const token = localStorage.getItem('token');
   if (token !== null) {
      isAuthentificated = true;
   }

   const GET_PROFILE_QUERY = gql`
      query getProfile {
         getProfile
      }
   `;

   const response = useQuery(GET_PROFILE_QUERY);

   const userAccount = response?.data?.getProfile;

   return (
      <AuthContext.Provider value={{ isAuthentificated, userAccount }}>
         {children}
      </AuthContext.Provider>
   );
};
