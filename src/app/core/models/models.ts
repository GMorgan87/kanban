export enum PriorityLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: PriorityLevel;
  assignee?: string;
  columnId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  title: string;
  columns: Column[]
}
