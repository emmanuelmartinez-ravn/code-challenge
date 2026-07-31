import { createBrowserRouter } from 'react-router'
import ErrorPage from '@shared/ErrorPage/ErrorPage'
import NotFoundPage from '@shared/NotFoundPage/NotFoundPage'

import RootLayout from '@core/layout/RootLayout'

import HomePage from '@features/HomePage/HomePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
