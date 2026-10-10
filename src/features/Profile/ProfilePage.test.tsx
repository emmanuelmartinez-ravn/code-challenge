import { render, screen, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import ProfilePage from './ProfilePage'
import { GET_PROFILE } from '@graphql/queries/profile'

const profile = {
  id: '1',
  avatar: 'https://example.com/avatar.png',
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  type: 'ADMIN',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-02-01T00:00:00.000Z',
}

const loadFailure = {
  request: { query: GET_PROFILE },
  error: new Error('Network down'),
}

const loadSuccess = {
  request: { query: GET_PROFILE },
  result: { data: { profile } },
}

describe('ProfilePage', () => {
  it('shows an error state when the profile fails to load', async () => {
    render(
      <MockedProvider mocks={[loadFailure]}>
        <ProfilePage />
      </MockedProvider>,
    )

    expect(await screen.findByRole('alert')).toHaveTextContent(
      "Couldn't load your profile.",
    )
  })

  it('keeps a page heading when the profile fails to load', async () => {
    render(
      <MockedProvider mocks={[loadFailure]}>
        <ProfilePage />
      </MockedProvider>,
    )
    await screen.findByRole('alert')

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('reloads the profile when Retry is clicked', async () => {
    render(
      <MockedProvider mocks={[loadFailure, loadSuccess]}>
        <ProfilePage />
      </MockedProvider>,
    )

    fireEvent.click(await screen.findByRole('button', { name: 'Retry' }))

    expect(await screen.findByText('Ada Lovelace')).toBeInTheDocument()
  })
})
