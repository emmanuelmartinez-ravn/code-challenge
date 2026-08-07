import { createBrowserRouter, Navigate } from 'react-router'
import ErrorPage from '@shared/ErrorPage/ErrorPage'
import NotFoundPage from '@shared/NotFoundPage/NotFoundPage'

import RootLayout from '@core/layout/RootLayout'

import DashboardPage from '@features/Dashboard/DashboardPage'
import MyTaskPage from '@features/MyTask/MyTaskPage'
import PlaceholderPage from '@features/PlaceholderPage/PlaceholderPage'
import ProfilePage from '@features/Profile/ProfilePage'
import ControlsLayout from '@core/layout/ControlsLayout/ControlsLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ControlsLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'my-task',
            element: <MyTaskPage />,
          },
        ],
      },
      {
        path: 'projects',
        element: <PlaceholderPage name="Projects" />,
      },
      { path: 'calendar', element: <PlaceholderPage name="Calendar" /> },
      { path: 'time-manage', element: <PlaceholderPage name="Time Manage" /> },
      { path: 'reports', element: <PlaceholderPage name="Reports" /> },
      { path: 'settings', element: <PlaceholderPage name="Settings" /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
