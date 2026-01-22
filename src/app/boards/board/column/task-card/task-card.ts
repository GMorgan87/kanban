import {Component, computed, input} from '@angular/core';
import {Task} from '../../../../core/models/models';


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
  readonly task = input.required<Task>();
  readonly priorityColour = computed<string>(() => PRIORITY_COLOUR_MAP[this.task()?.priority || 'Low']);
}
