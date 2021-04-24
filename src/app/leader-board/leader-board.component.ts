import { Component, OnInit } from '@angular/core';
import { LeaderBoardService } from '../services/leader-board/leader-board.service';
import { LeaderBoard } from '../services/leader-board/leader-board';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'paul-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.less']
})
export class LeaderBoardComponent {
  leaderBoardResult: LeaderBoard[];
  currentUserId:string = null;

  constructor(private leaderBoardService: LeaderBoardService, private authService: AuthService) { }


  getLeaderBoard() {
    this.leaderBoardService.getLeaderBoard().subscribe(result => {
        this.leaderBoardResult = result;
    });
  }
}
