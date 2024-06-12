import {lazy, Suspense} from 'react';
import {createBrowserRouter,} from 'react-router-dom';


const Login = lazy(() => import('./pages/Auth/Login.jsx'));
const RecoveryPassword = lazy(() => import('./pages/Auth/RecoveryPassword.jsx'));
const Token = lazy(() => import('./pages/Auth/Token.jsx'));
const Page404 = lazy(() => import('./pages/Page404.jsx'));
const Dashboard = lazy(() => import('./pages/Animal/Dashboard.jsx'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute.jsx'));
const Females = lazy(() => import('./pages/Animal/Females.jsx'));
const Males = lazy(() => import('./pages/Animal/Males.jsx'));
const Tools = lazy(() => import('./pages/Tools/Tools.jsx'));
const Colors = lazy(() => import('./pages/Tools/Colors.jsx'));
const CreateAnimal = lazy(() => import('./pages/Animal/CreateAnimal.jsx'));
const EditRegister = lazy(() => import('./pages/Animal/EditRegister.jsx'));
const Weights = lazy(() => import('./pages/Animal/Weights.jsx'));
const AnimalDetails = lazy(() => import('./pages/Animal/AnimalDetails.jsx'));
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
                },
                {
                    path: '/tools',
                    element: <Tools/>
                },
                {
                    path: '/tools/colors',
                    element: <Colors/>
                },
                {
                    path: '/animal/create',
                    element: <CreateAnimal/>
                },
                {
                    path: '/animal/edit/:animalId',
                    element: <EditRegister/>
                },
                {
                    path: '/animal/weighs/:animalId',
                    element: <Weights/>
                },
                {
                    path: '/animal/details/:animalId',
                    element: <AnimalDetails/>
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

