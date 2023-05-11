import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { WildersProvider } from './utils/context/wildersContext';
import { AuthProvider } from './utils/context/authContext';
import WildersPage from './pages/WildersPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Layout from './components/Layout/Layout';

function App() {
   const router = createBrowserRouter([
      {
         element: <Layout />,
         children: [
            {
               path: '/',
               element: <Home />,
            },
            {
               path: '/wilders',
               element: <WildersPage />,
            },
            {
               path: '/sign-in',
               element: <SignInPage />,
            },
            { path: '/sign-up', element: <SignUpPage /> },
         ],
      },
   ]);
   return (
      <div className="App">
         <AuthProvider>
            <WildersProvider>
               <RouterProvider router={router} />
            </WildersProvider>
         </AuthProvider>
      </div>
   );
}

export default App;
