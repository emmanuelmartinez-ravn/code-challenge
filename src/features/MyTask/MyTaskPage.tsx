import Accordion from '@shared/components/Accordion/Accordion'
import './MyTaskPage.css'
import TablesHeader from './TablesHeader'

function MyTaskPage() {
  return (
    <section className="my-task">
      <h1 className="sr-only">My task</h1>
      <div className="my-task__content">
        <TablesHeader />
        <div className="table__accordion">
          <Accordion title="To Do" subtitle="(05)">
            <div>TESTING</div>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default MyTaskPage
