import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  loading: Boolean = true;

  constructor(private leaderBoardService: LeaderBoardService, private authService: AuthService,
      private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    if(this.authService.authStatus) {
      this.getLeaderBoard();

      this.currentUserId = this.authService.user.userId;
    }

    this.authService.loggedIn.subscribe(() => {
      this.getLeaderBoard();

      this.currentUserId = this.authService.user.userId;
    });
  }

  getLeaderBoard() {
    this.leaderBoardService.getLeaderBoard().subscribe(result => {
        this.leaderBoardResult = result;
        this.loading = false;
        this.changeDetector.detectChanges();
    });
  }
}
