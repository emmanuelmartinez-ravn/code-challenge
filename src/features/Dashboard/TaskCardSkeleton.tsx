import Skeleton from '@shared/components/Skeleton/Skeleton'
import './TaskCardSkeleton.css'

function TaskCardSkeleton() {
  return (
    <article aria-hidden="true" className="task-card-skeleton">
      <div className="task-card-skeleton__header">
        <Skeleton height="1.25rem" width="70%" />
        <Skeleton height="1.5rem" variant="circle" width="1.5rem" />
      </div>
      <Skeleton height="1rem" width="50%" />
      <div className="task-card-skeleton__tags">
        <Skeleton height="1.5rem" width="3rem" />
        <Skeleton height="1.5rem" width="3rem" />
      </div>
      <Skeleton height="1.75rem" variant="circle" width="1.75rem" />
    </article>
  )
}

export default TaskCardSkeleton
