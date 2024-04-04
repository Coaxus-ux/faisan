import {lazy, Suspense} from 'react';
import {createBrowserRouter,} from 'react-router-dom';


const Login = lazy(() => import('./pages/Auth/Login.jsx'));
const RecoveryPassword = lazy(() => import('./pages/Auth/RecoveryPassword.jsx'));
const Token = lazy(() => import('./pages/Auth/Token.jsx'));
const Page404 = lazy(() => import('./pages/Page404.jsx'));
const Dashboard = lazy(() => import('./pages/Animal/Dashboard.jsx'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute.jsx'));
// const AnimalPanel = lazy(() => import('./pages/Animal/AnimalPanel.jsx'));
const Females = lazy(() => import('./pages/Animal/Females.jsx'));
const Males = lazy(() => import('./pages/Animal/Males.jsx'));

export const routes = [

    {
        path: '/auth/login',
        element: <Login/>
    },
    {
        path: '/auth/recovery-password',
        element: <RecoveryPassword/>
    },
    {
        path: '/auth/token',
        element: <Token/>
    },
    {
        path: '/',
        element: <ProtectedRoute/>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/females',
                element: <Females/>
            },
            {
                path: '/males',
                element: <Males/>
            }
        ]

    },
    {
        path: '*',
        element: <Page404/>
    }
]
;
export default createBrowserRouter(routes);

