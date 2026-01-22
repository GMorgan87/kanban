import {Component, computed, inject, input, OnInit} from '@angular/core';
import {Column, Task} from '../../../core/models/models';
import {Store} from '@ngrx/store';
import {tasksFeature} from '../../../state/task/task.state';

@Component({
  selector: 'app-column',
  imports: [],
  standalone: true,
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class ColumnComponent implements OnInit {

  private store = inject(Store)
  readonly column = input<Column>()
  readonly tasks = computed(() => {
    const columnId = this.column()?.id || '';
    // Get the selector for this ID and then execute it against the store
    return this.store.selectSignal(tasksFeature.selectTasksByColumn(columnId))();
  });
  ngOnInit() {
  }
}
