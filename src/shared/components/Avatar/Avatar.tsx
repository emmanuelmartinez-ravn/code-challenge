import { useEffect, useState } from 'react'
import avatarPlaceholder from '@assets/placeholder.png'
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

function toProxiedAvatarUrl(src: string): string {
  return `https://images.weserv.nl/?url=${encodeURIComponent(src)}`
}

const verifiedSrcCache = new Map<string, Promise<string>>()

function verifyAvatarSrc(src: string): Promise<string> {
  const cached = verifiedSrcCache.get(src)

  if (cached) {
    return cached
  }

  const proxiedSrc = toProxiedAvatarUrl(src)

  const verified = fetch(proxiedSrc)
    .then((response) => (response.ok ? proxiedSrc : avatarPlaceholder))
    .catch(() => avatarPlaceholder)

  verifiedSrcCache.set(src, verified)

  return verified
}

function Avatar({ size = 'm', src, alt = 'Avatar' }: AvatarProps) {
  const [displaySrc, setDisplaySrc] = useState(avatarPlaceholder)

  useEffect(() => {
    if (!src) {
      return
    }

    let isCancelled = false

    verifyAvatarSrc(src).then((verifiedSrc) => {
      if (!isCancelled) {
        setDisplaySrc(verifiedSrc)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [src])

  return (
    <img
      src={displaySrc}
      alt={alt}
      className={`avatar avatar--${size}`}
      onError={(event) => {
        event.currentTarget.onerror = null
        event.currentTarget.src = avatarPlaceholder
      }}
    />
  )
}

export default Avatar
