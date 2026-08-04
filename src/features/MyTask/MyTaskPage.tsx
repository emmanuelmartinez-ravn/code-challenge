import './MyTaskPage.css'
import TablesHeader from './TablesHeader'

function MyTaskPage() {
  return (
    <section className="my-task">
      <h1 className="sr-only">My task</h1>
      <div className="my-task__content">
        <TablesHeader />
      </div>
    </section>
  )
}

export default MyTaskPage
