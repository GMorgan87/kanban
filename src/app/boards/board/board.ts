import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class BoardComponent implements OnInit {

  ngOnInit(): void {
    console.log('BOARD INIT')
  }
}
