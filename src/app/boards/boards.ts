import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardActions } from '../state/board/board.actions';
import { boardsFeature } from '../state/board/board.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-boards',
  imports: [],
  templateUrl: './boards.html',
  styleUrl: './boards.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent implements OnInit {
  private readonly store = inject(Store);
  private router = inject(Router)

  readonly boards = this.store.selectSignal(boardsFeature.selectAll);
  readonly loading = this.store.selectSignal(boardsFeature.selectLoading);
  readonly error = this.store.selectSignal(boardsFeature.selectError);

  ngOnInit(): void {
    this.store.dispatch(BoardActions.loadBoards());
  }

  handleBoardSelect(id: string){
    this.store.dispatch(BoardActions.selectBoard({id}))
    this.router.navigate(['/board', id])
  }
}
