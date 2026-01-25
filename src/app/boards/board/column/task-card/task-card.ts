import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {Task, PriorityLevel} from '../../../../core/models/models';
import {Store} from '@ngrx/store';
import {boardsFeature} from '../../../../state/board/board.feature';
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
  readonly columns = computed(() => this.store.selectSignal(boardsFeature.selectSelectedBoard)()?.columns || []);
  readonly priorityColour = computed<string>(() => PRIORITY_COLOUR_MAP[this.task()?.priority || 'Low']);
  readonly selectedColumnId = computed(() => this.task().columnId);
  readonly createdAt = computed(() => new Date(this.task().createdAt).toLocaleString());
  readonly updatedAt = computed(() => new Date(this.task().updatedAt).toLocaleString());
  readonly isEditMode = signal<boolean>(false);
  readonly editForm = signal({
    title: '',
    description: '',
    priority: 'Low' as PriorityLevel,
    assignee: ''
  });

  readonly formFields = [
    { key: 'title' as const, label: 'Title', type: 'text' },
    { key: 'description' as const, label: 'Description', type: 'textarea' },
    { key: 'priority' as const, label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
    { key: 'assignee' as const, label: 'Assignee', type: 'text' }
  ];

  constructor() {
    effect(() => {
      const task = this.task();
      if (task) {
        this.editForm.set({
          title: task.title,
          description: task.description ?? '',
          priority: task.priority,
          assignee: task.assignee ?? ''
        });
      }
    });
  }

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

  handleEditClick(){
    if (this.isEditMode()) {
      this.handleSave()
    } else {
      this.isEditMode.set(!this.isEditMode())
    }
  }

  handleSave(){
    console.log('SAVE FORM', this.editForm())
    this.store.dispatch(TaskActions.updateTask({
      id: this.task().id,
      updates: this.editForm()
    }))
    this.isEditMode.set(false)
  }

  updateFormField(field: "title" | "description" | "priority" | "assignee", value: string): void {
    this.editForm.update(form => ({
      ...form,
      [field]: value
    }));
  }

}
