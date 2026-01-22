import {Component, computed, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import { boardsFeature } from '../../state/board/board.feature';
import {BoardActions} from '../../state/board/board.actions';
import {ActivatedRoute} from '@angular/router';
import {ColumnComponent} from './column/column';
import {TaskActions} from '../../state/task/task.actions';

@Component({
  selector: 'app-board',
  imports: [
    ColumnComponent
  ],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class BoardComponent implements OnInit {
  private readonly store = inject(Store);
  private route = inject(ActivatedRoute)

  readonly board = this.store.selectSignal(boardsFeature.selectSelectedBoard);
  readonly columns = computed(() => {
    const board = this.board()
    if (!board) return []
    return board.columns
  })

  ngOnInit(): void {
    console.log('LOAD TASKS')
    this.store.dispatch(TaskActions.loadTasks())
    if (!this.board()) {
      this.store.dispatch(BoardActions.loadBoards());
      const selectedId = this.route.snapshot.paramMap.get('id');
      if (selectedId) {
        this.store.dispatch(BoardActions.selectBoard({ id: selectedId }));
      }
    }
    console.log('BOARD INIT', this.board())
  }
}
