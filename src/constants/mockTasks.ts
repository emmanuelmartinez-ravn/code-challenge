import type { Task } from './Task'

const mockUser = {
  id: 'mock-user-1',
  avatar: 'https://i.pravatar.cc/150?u=mock-user-1',
  fullName: 'Mock User',
}

export const MOCK_TASKS: Task[] = [
  {
    id: 'mock-task-1',
    assignee: mockUser,
    createdAt: '2026-10-01T12:00:00.000Z',
    creator: mockUser,
    dueDate: '2026-10-20T12:00:00.000Z',
    name: 'Mock task while the backend is down',
    pointEstimate: 'FOUR',
    position: 1,
    status: 'TODO',
    tags: ['REACT', 'NODE_JS'],
  },
]
