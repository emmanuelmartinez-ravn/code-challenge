import './TasksTable.css'
import Badge from '@shared/components/Badge/Badge'
import Avatar from '@shared/components/Avatar/Avatar'
import type { Task } from '@constants/Task'
import { formatDate, pointEstimateToNumber } from '@constants/utils'

function TaskTable({ tasks }: { readonly tasks?: Task[] }) {
  if (!tasks) {
    return null
  }

  return (
    <table className="task-table">
      <tbody>
        {tasks.map((task, index) => {
          const tagsCount = task.tags?.length ?? 0

          return (
            <tr key={task.id}>
              <td className="task-table__title body body--s">
                <h3
                  className={`task-table__title__status ${(() => {
                    if (formatDate(task.dueDate).status === 'overdue') {
                      return 'task-table__title__status--overdue'
                    }

                    if (formatDate(task.dueDate).status === 'near') {
                      return 'task-table__title__status--near'
                    }

                    return ''
                  })()}`}
                >{`${String(index + 1).padStart(2, '0')} ${task.name}`}</h3>
              </td>

              <td className="task-table__tags">
                {tagsCount > 0 && <Badge label="Tag" name={task.tags![0]} />}

                {tagsCount > 1 && (
                  <Badge label="Tag" name={`+${tagsCount - 1}`} />
                )}
              </td>

              <td className="task-table__points">
                {pointEstimateToNumber(task.pointEstimate)} Points
              </td>

              <td className="task-table__assignee">
                <Avatar src={task.assignee.avatar} size="s" />
                <span>{task.assignee.fullName}</span>
              </td>

              <td
                className={`task-table__due-date ${(() => {
                  if (formatDate(task.dueDate).status === 'overdue') {
                    return 'task-table__due-date--overdue'
                  }

                  if (formatDate(task.dueDate).status === 'near') {
                    return 'task-table__due-date--near'
                  }

                  return ''
                })()}`}
              >
                {formatDate(task.dueDate).formatted}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TaskTable
