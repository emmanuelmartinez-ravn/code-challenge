import type { Task } from '@features/Dashboard/TaskCard'
import './TasksTable.css'

function TaskTable({ tasks }: { readonly tasks: Task[] }) {
  return (
    <table className="task-table">
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task.title}>
            <td className="task-table__title body body--s">
              <h3 className="task-table__title__status">{`${String(index + 1).padStart(2, '0')} ${task.title}`}</h3>
            </td>
            <td className="task-table__tags">{task.tags.join(', ')}</td>
            <td className="task-table__points">{task.points}</td>
            <td className="task-table__asignee">{task.asignee}</td>
            <td className="task-table__due-date">
              {task.dueDate.toDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TaskTable
