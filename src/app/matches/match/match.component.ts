import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../services/leagues/match';

@Component({
  selector: 'paul-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.less']
})
export class MatchComponent implements OnInit {
  @Input() match: Match;

  constructor() { }

  ngOnInit() {
  }

}
