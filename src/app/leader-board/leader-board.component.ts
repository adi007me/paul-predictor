import { Component, OnInit } from '@angular/core';
import { LeaderBoardService } from '../services/leader-board/leader-board.service';
import { LeaderBoard } from '../services/leader-board/leader-board';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'paul-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.less']
})
export class LeaderBoardComponent implements OnInit {
  leaderBoardResult: LeaderBoard[];

  constructor(private leaderBoardService: LeaderBoardService, private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.authStatus) {
      this.getLeaderBoard();
    }

    this.authService.loggedIn.subscribe(() => {
      this.getLeaderBoard();
    });
  }

  getLeaderBoard() {
    this.leaderBoardService.getLeaderBoard().subscribe(result => {
      this.leaderBoardResult = result;
    });
  }
}
