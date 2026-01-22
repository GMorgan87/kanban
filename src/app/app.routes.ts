import { Routes } from '@angular/router';
import {BoardsComponent} from './boards/boards';
import {BoardComponent} from './boards/board/board';

export const routes: Routes = [
  { path: '', component: BoardsComponent },
  { path: 'board/:id', component: BoardComponent }
];
