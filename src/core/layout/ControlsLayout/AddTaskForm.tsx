import type { SubmitEvent } from 'react'
import './AddTaskForm.css'

function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault()
}

function AddTaskForm() {
  return (
    <form onSubmit={(event) => handleSubmit(event)} className="add-task-form">
      <div className="add-task-form__header">
        <label>
          <span className="sr-only">Task title</span>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            className="body body--l body--bold"
          />
        </label>
      </div>

      <div className="add-task-form__body">
        <label>
          <span className="sr-only">Task estimate</span>
          <select name="estimate">
            <option value="zero">0 points</option>
            <option value="one">1 point</option>
            <option value="two">2 points</option>
            <option value="four">4 points</option>
            <option value="eight">8 points</option>
          </select>
        </label>

        <label>
          <span className="sr-only">Task assignee</span>
          <select name="assignee">
            <option value="me">Me</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Doe</option>
          </select>
        </label>
      </div>

      <div className="add-task-form__footer">
        <button type="submit">Add task</button>
      </div>
    </form>
  )
}

export default AddTaskForm
