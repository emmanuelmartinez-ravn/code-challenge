import { useQuery } from '@apollo/client/react'
import { GET_PROFILE } from '@graphql/queries/profile'
import Avatar from '@shared/components/Avatar/Avatar'
import Badge from '@shared/components/Badge/Badge'
import Skeleton from '@shared/components/Skeleton/Skeleton'
import './ProfilePage.css'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const SKELETON_DETAILS_COUNT = 3

function ProfilePage() {
  const { data, loading } = useQuery(GET_PROFILE)

  const profile = data?.profile

  if (loading) {
    return (
      <section aria-busy={true} className="profile-page">
        <div className="profile-page__header">
          <Skeleton height="48px" variant="circle" width="48px" />
          <div>
            <Skeleton height="1.75rem" width="160px" />
            <Skeleton height="1.5rem" width="100px" />
          </div>
        </div>

        <dl className="profile-page__details">
          {Array.from({ length: SKELETON_DETAILS_COUNT }, (_, index) => (
            <div key={index}>
              <Skeleton height="1rem" width="80px" />
              <Skeleton height="1.25rem" width="140px" />
            </div>
          ))}
        </dl>
      </section>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <section className="profile-page">
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
    </section>
  )
}

export default ProfilePage
