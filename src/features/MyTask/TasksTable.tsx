import type { Task } from '@features/Dashboard/TaskCard'
import './TasksTable.css'
import Badge from '@shared/components/Badge/Badge'
import Avatar from '@shared/components/Avatar/Avatar'
import { formatDueDate } from '@features/Dashboard/TaskCard'

function TaskTable({ tasks }: { readonly tasks: Task[] }) {
  return (
    <table className="task-table">
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task.title}>
            <td className="task-table__title body body--s">
              <h3
                className={`task-table__title__status ${formatDueDate(task.dueDate).isOverdue ? 'task-table__title__status--overdue' : ''}  `}
              >{`${String(index + 1).padStart(2, '0')} ${task.title}`}</h3>
            </td>
            <td className="task-table__tags">
              <Badge label="Tag" name={task.tags[0]} />
              {task.tags.length > 1 ? (
                <Badge label="Tag" name={`+${task.tags.length - 1}`} />
              ) : null}
            </td>
            <td className="task-table__points">{task.points} Points</td>
            <td className="task-table__asignee">
              <Avatar src={task.asignee} alt="Asignee" size="s" />
              <span>Asignee name</span>
            </td>
            <td
              className={`task-table__due-date ${formatDueDate(task.dueDate).isOverdue ? 'task-table__due-date--overdue' : ''}`}
            >
              {formatDueDate(task.dueDate).formatted}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TaskTable
