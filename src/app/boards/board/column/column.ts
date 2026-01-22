import {Component, computed, inject, input} from '@angular/core';
import {Column, Task} from '../../../core/models/models';
import {Store} from '@ngrx/store';
import {tasksFeature} from '../../../state/task/task.state';
import {TaskCard} from './task-card/task-card';

@Component({
  selector: 'app-column',
  imports: [
    TaskCard
  ],
  standalone: true,
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class ColumnComponent{

  private store = inject(Store)
  readonly column = input<Column>()
  readonly tasks = computed(() => {
    const columnId = this.column()?.id || '';
    return this.store.selectSignal(tasksFeature.selectTasksByColumn(columnId))();
  });
}
