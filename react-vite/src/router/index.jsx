import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import SplashPage from '../components/SplashPage/SplashPage';
import SpotDetailView from '../components/SpotDetailView/SpotDetailView';
import NewSpotForm from '../components/NewSpotForm/NewSpotForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetailView />,
      },
      {
        path: "/spots/new",
        element: <NewSpotForm />,
      },
    ],
  },
]);
