import { createContext, useState, useEffect, PropsWithChildren } from 'react';
import Iwilder from '../interfaces/IWilder';
import { gql, useQuery } from '@apollo/client';

interface WildersContextProps {
  wilders: Iwilder[];
  fetchData: () => void | Promise<void>;
}

export const WildersContext = createContext<WildersContextProps>({
  wilders: [],
  fetchData: () => {},
});

const GET_WILDERS = gql`
  query getWilders {
    getWilders {
      id
      name
      city
      email
      skills {
        id
        name
      }
    }
  }
`;

export const WildersProvider = ({ children }: PropsWithChildren) => {
  const { data, refetch } = useQuery(GET_WILDERS);

  const wilders = data?.getWilders || [];

  const fetchData = async () => {
    await refetch();
  };

  return (
    <WildersContext.Provider
      value={{
        wilders,
        fetchData,
      }}
    >
      {children}
    </WildersContext.Provider>
  );
};
