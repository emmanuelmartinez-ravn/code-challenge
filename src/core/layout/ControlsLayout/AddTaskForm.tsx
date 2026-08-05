function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
}

function AddTaskForm() {
  return (
    <form onSubmit={(event) => handleSubmit(event)} className="add-task-form">
      <label>
        <span className="sr-only">Task title</span>
        <input type="text" name="title" placeholder="Task title" />
      </label>
    </form>
  )
}

export default AddTaskForm
