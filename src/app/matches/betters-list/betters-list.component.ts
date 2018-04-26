import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../services/leagues/match';
import { Bets } from '../../services/better-list/bets';
import { BetterListService } from '../../services/better-list/better-list.service';

@Component({
  selector: 'paul-betters-list',
  templateUrl: './betters-list.component.html',
  styleUrls: ['./betters-list.component.less']
})
export class BettersListComponent implements OnInit {
  bets: Bets;
  loading: Boolean;
  isExpanded: Boolean;

  @Input() match: Match;

  constructor(private betterList : BetterListService) { }

  ngOnInit() {
    this.loading = false;
    this.isExpanded = false;
  }

  showBets() {
    this.isExpanded = !this.isExpanded;
    if (this.bets) {
      return;
    }

    this.loading = true;

    this.betterList.getBetterList(this.match.match_id).subscribe(bets => {
      this.bets = bets;
      this.loading = false;
    });
  }
}
