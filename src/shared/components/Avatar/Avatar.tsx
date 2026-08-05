import avatarPlaceholder from '@assets/avatar-placeholder.png'
import './Avatar.css'

export type AvatarProps = {
  size?: 's' | 'm' | 'l'
} & (
  | {
      readonly src: string
      readonly alt?: string
    }
  | {
      readonly src?: never
      readonly alt?: never
    }
)

function Avatar({
  size = 'm',
  src = avatarPlaceholder,
  alt = 'Avatar',
}: AvatarProps) {
  return <img src={src} alt={alt} className={`avatar avatar--${size}`} />
}

export default Avatar
