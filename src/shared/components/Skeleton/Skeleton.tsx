import type { CSSProperties } from 'react'
import './Skeleton.css'

function Skeleton({
  width,
  height,
  variant = 'rect',
  className = '',
}: {
  readonly width?: CSSProperties['width']
  readonly height?: CSSProperties['height']
  readonly variant?: 'rect' | 'circle' | 'text'
  readonly className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`skeleton skeleton--${variant} ${className}`}
      style={{ width, height }}
    />
  )
}

export default Skeleton
