import {Component, computed, inject, input} from '@angular/core';
import {Task} from '../../../../core/models/models';
import {Store} from '@ngrx/store';
import {tasksFeature} from '../../../../state/task/task.state';
import {boardsFeature} from '../../../../state/board/board.state';
import {TaskActions} from '../../../../state/task/task.actions';


const PRIORITY_COLOUR_MAP = {
  'Low': 'green',
  'Medium': 'yellow',
  'High': 'red',
  'Critical': 'purple',
}

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  private store = inject(Store);
  readonly task = input.required<Task>();
  readonly priorityColour = computed<string>(() => PRIORITY_COLOUR_MAP[this.task()?.priority || 'Low']);
  readonly columns = computed(() => this.store.selectSignal(boardsFeature.selectSelectedBoard)()?.columns || []);
  readonly selectedColumnId = computed(() => this.task().columnId);

  onColumnChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newColumnId = target.value;
    const task = this.task();
    if (newColumnId && newColumnId !== task.columnId) {
      this.store.dispatch(TaskActions.moveTask({
        taskId: task.id,
        columnId: newColumnId,
        previousColumnId: task.columnId
      }));
    }
  }
}
