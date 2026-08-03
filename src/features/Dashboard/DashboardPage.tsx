import './DashboardPage.css'
import TaskCard from './TaskCard'
import avatarPlaceholder2 from '@assets/avatar-placeholder2.png'

function DashboardPage() {
  return (
    <section className="dashboard">
      <h1 className="sr-only">Dashboard</h1>
      <TaskCard
        title="Slack"
        points={4}
        asignee={avatarPlaceholder2}
        labels={['IOS APP', 'ANDROID']}
        dueDate={new Date(2026, 7, 1)}
      />
    </section>
  )
}

export default DashboardPage
