import './TablesHeader.css'

function TablesHeader() {
  return (
    <div className="my-task__header">
      <h3 className="body body--m body--bold"># Task Name</h3>
      <h3 className="body body--m body--bold">Task Tags</h3>
      <h3 className="body body--m body--bold">Estimate</h3>
      <h3 className="body body--m body--bold">Task Assign Name</h3>
      <h3 className="body body--m body--bold">Due Date</h3>
    </div>
  )
}

export default TablesHeader
