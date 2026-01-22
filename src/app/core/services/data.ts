import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError, timer, switchMap } from 'rxjs';
import { Board, Task } from '../models/models';
import { MOCK_BOARDS, MOCK_TASKS } from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private boards = [...MOCK_BOARDS];
  private tasks = [...MOCK_TASKS];

  getBoards(): Observable<Board[]> {
    return of(this.boards).pipe(delay(500));
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks).pipe(delay(500));
  }

  addTask(task: Partial<Task>): Observable<Task> {
    const newTask: Task = {
      id: `task-${new Date().toISOString()}`,
      title: task.title || 'New Task',
      description: task.description || '',
      priority: task.priority || (null as any), // Should be provided in real app
      columnId: task.columnId || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...task,
    };
    this.tasks = [...this.tasks, newTask];
    return of(newTask).pipe(delay(500));
  }

  updateTask(id: string, updates: Partial<Task>): Observable<Task> {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return throwError(() => new Error('Task not found'));
    }
    const updatedTask = {
      ...this.tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.tasks = [
      ...this.tasks.slice(0, taskIndex),
      updatedTask,
      ...this.tasks.slice(taskIndex + 1),
    ];
    return of(updatedTask).pipe(delay(500));
  }

  deleteTask(id: string): Observable<void> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return of(undefined).pipe(delay(500));
  }

  moveTask(taskId: string, targetColumnId: string): Observable<Task> {
    const shouldFail = Math.random() < 0.33;
    return timer(500).pipe(
      switchMap(() => {
        if (shouldFail) {
          return throwError(() => new Error('Failed to move task'));
        }
        return this.updateTask(taskId, { columnId: targetColumnId });
      })
    );
  }
}
