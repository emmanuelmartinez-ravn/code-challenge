import './DashboardPage.css'
import TaskCard from './TaskCard'
import avatarPlaceholder2 from '@assets/avatar-placeholder2.png'
import { type Task } from './TaskCard'

export const placeholderTask: Task = {
  title: 'Slack',
  points: 4,
  asignee: avatarPlaceholder2,
  tags: ['IOS APP', 'ANDROID'],
  dueDate: new Date(2026, 7, 1),
}

function DashboardPage() {
  return (
    <section className="dashboard">
      <h1 className="sr-only">Dashboard</h1>
      <div className="dashboard__cards">
        <h2 className="body body--l">Working (03)</h2>
        <h2 className="body body--l">In Progress (03)</h2>
        <h2 className="body body--l">Completed (03)</h2>
        <TaskCard task={placeholderTask} />
        <TaskCard task={placeholderTask} />
        <TaskCard task={placeholderTask} />
      </div>
    </section>
  )
}

export default DashboardPage
