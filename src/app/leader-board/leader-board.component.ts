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
  currentUserId:string = null;
  loading = false;
  statsData : LeaderBoard = null
  rank = null;

  constructor(private leaderBoardService: LeaderBoardService, private authService: AuthService) {
    this.loading = true;
   }

  ngOnInit() {
    this.getLeaderBoard();
  }

  getLeaderBoard() {
    this.leaderBoardService.getLeaderBoard().subscribe(result => {
        this.loading = false;
        this.leaderBoardResult = result;
    });
  }

  showStats(user: LeaderBoard, rank: number) {
    this.statsData = user
    this.rank = rank;
  }
}
