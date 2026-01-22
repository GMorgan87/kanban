import {Component, computed, inject, input} from '@angular/core';
import {Column} from '../../../core/models/models';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-column',
  imports: [],
  standalone: true,
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class ColumnComponent {

  private store = inject(Store)
  readonly column = input<Column>()
  readonly tasks = computed(() => {})

}
