import type { PointEstimate } from './PointEstimate'
import type { Status } from './Status'
import type { Tag } from './Tag'
import type { User } from './User'

export type Task = {
  id: string
  assignee: User | null
  createdAt: Date
  creator: User
  dueDate: Date
  name: string
  pointEstimate: PointEstimate
  position: number
  status: Status
  tags: Tag[]
}

export type GetTasksResponse = {
  tasks: Task[]
}

export type GetTasksVariables = {
  input: {
    assigneeId?: string
    dueDate?: Date
    name?: string
    ownerId?: string
    pointEstimate?: PointEstimate
    status?: Status
    tags?: Tag[]
  }
}

export type CreateTaskResponse = {
  createTask: Task
}

export type CreateTaskVariables = {
  input: {
    assigneeId?: string
    dueDate: Date
    name: string
    pointEstimate: PointEstimate
    status: Status
    tags: Tag[]
  }
}

export type UpdateTaskResponse = {
  updateTask: Task
}

export type UpdateTaskVariables = {
  input: {
    id: string
    assigneeId?: string
    dueDate?: Date
    name?: string
    pointEstimate?: PointEstimate
    position?: number
    status?: Status
    tags?: Tag[]
  }
}

export type DeleteTaskResponse = {
  deleteTask: Pick<Task, 'id'>
}

export type DeleteTaskVariables = {
  input: {
    id: string
  }
}
