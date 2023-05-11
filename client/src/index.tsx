import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
   ApolloClient,
   ApolloProvider,
   InMemoryCache,
   createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
   uri: 'http://localhost:3001',
});

const authLink = setContext((_, { headers }) => {
   const token = localStorage.getItem('token');
   let header = '';
   if (token !== null) {
      header = `Bearer ${token}`;
   }

   return {
      headers: {
         ...headers,
         authorization: header,
      },
   };
});

const client = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);
root.render(
   <React.StrictMode>
      <ApolloProvider client={client}>
         <App />
      </ApolloProvider>
   </React.StrictMode>
);
