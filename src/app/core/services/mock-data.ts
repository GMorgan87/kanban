import { Board, Column, PriorityLevel, Task } from '../models/models';

export const MOCK_BOARDS: Board[] = [
  {
    id: 'board-1',
    title: 'Project Development',
    columns: []
  }
];

export const MOCK_COLUMNS: Column[] = [
  {
    id: 'col-1',
    title: 'To Do',
    order: 0,
    boardId: 'board-1',
    tasks: []
  },
  {
    id: 'col-2',
    title: 'In Progress',
    order: 1,
    boardId: 'board-1',
    tasks: []
  },
  {
    id: 'col-3',
    title: 'Review',
    order: 2,
    boardId: 'board-1',
    tasks: []
  },
  {
    id: 'col-4',
    title: 'Done',
    order: 3,
    boardId: 'board-1',
    tasks: []
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Setup project boilerplate',
    description: 'Initialize Angular app and install dependencies',
    priority: PriorityLevel.HIGH,
    columnId: 'col-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Define data models',
    description: 'Create interfaces for Board, Column, and Task',
    priority: PriorityLevel.MEDIUM,
    columnId: 'col-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Design UI layout',
    description: 'Sketch the main kanban board view',
    priority: PriorityLevel.LOW,
    columnId: 'col-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task-4',
    title: 'Implement drag and drop',
    description: 'Enable moving tasks between columns',
    priority: PriorityLevel.CRITICAL,
    columnId: 'col-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task-5',
    title: 'Add task details modal',
    description: 'Create a view to see and edit task properties',
    priority: PriorityLevel.MEDIUM,
    columnId: 'col-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task-6',
    title: 'Code review: API integration',
    description: 'Check the new service layer changes',
    priority: PriorityLevel.HIGH,
    columnId: 'col-3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task-7',
    title: 'User testing',
    description: 'Gather feedback from beta users',
    priority: PriorityLevel.MEDIUM,
    columnId: 'col-3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task-8',
    title: 'Accessibility audit',
    description: 'Run AXE checks and fix violations',
    priority: PriorityLevel.CRITICAL,
    columnId: 'col-3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task-9',
    title: 'Initial requirements gathering',
    description: 'Meet with stakeholders to define scope',
    priority: PriorityLevel.LOW,
    columnId: 'col-4',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task-10',
    title: 'Project kickoff',
    description: 'Introduce the team and project goals',
    priority: PriorityLevel.MEDIUM,
    columnId: 'col-4',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
