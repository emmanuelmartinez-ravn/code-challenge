import { createBrowserRouter } from 'react-router'
import ErrorPage from '@shared/ErrorPage/ErrorPage'
import NotFoundPage from '@shared/NotFoundPage/NotFoundPage'

import RootLayout from '@core/layout/RootLayout'

import DashboardPage from '@features/Dashboard/DashboardPage'
import MyTaskPage from '@features/MyTask/MyTaskPage'
import PlaceholderPage from '@features/PlaceholderPage/PlaceholderPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'projects',
        element: <PlaceholderPage name="Projects" />,
      },
      {
        path: 'my-task',
        element: <MyTaskPage />,
      },
      { path: 'calendar', element: <PlaceholderPage name="Calendar" /> },
      { path: 'time-manage', element: <PlaceholderPage name="Time Manage" /> },
      { path: 'reports', element: <PlaceholderPage name="Reports" /> },
      { path: 'settings', element: <PlaceholderPage name="Settings" /> },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
