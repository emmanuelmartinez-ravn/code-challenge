import { useQuery } from '@apollo/client/react'
import { GET_PROFILE } from '@graphql/queries/profile'
import Avatar from '@shared/components/Avatar/Avatar'
import Badge from '@shared/components/Badge/Badge'
import './ProfilePage.css'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function ProfilePage() {
  const { data, loading } = useQuery(GET_PROFILE)

  const profile = data?.profile

  return (
    <section aria-busy={loading} className="profile-page">
      {profile && (
        <>
          <div className="profile-page__header">
            <Avatar alt={profile.fullName} size="l" src={profile.avatar} />
            <div>
              <h1 className="display display--xs display--bold">
                {profile.fullName}
              </h1>
              <Badge label="Account type" name={profile.type} />
            </div>
          </div>

          <dl className="profile-page__details">
            <div>
              <dt className="body body--s">Email</dt>
              <dd className="body body--l">{profile.email}</dd>
            </div>
            <div>
              <dt className="body body--s">Member since</dt>
              <dd className="body body--l">
                {dateFormatter.format(new Date(profile.createdAt))}
              </dd>
            </div>
            <div>
              <dt className="body body--s">Last updated</dt>
              <dd className="body body--l">
                {dateFormatter.format(new Date(profile.updatedAt))}
              </dd>
            </div>
          </dl>
        </>
      )}
    </section>
  )
}

export default ProfilePage
