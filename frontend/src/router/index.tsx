import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import FileManagerPage from '../pages/FileManagerPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <FileManagerPage />,
      },
    ],
  },
]);
