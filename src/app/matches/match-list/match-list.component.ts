import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../services/leagues/match';
import { HttpClient } from '@angular/common/http';
import { LeaguesService } from '../../services/leagues/leagues.service';
import { TeamsService } from '../../services/teams/teams.service';

@Component({
  selector: 'paul-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.less']
})
export class MatchListComponent implements OnInit {  
  @Input() header: String;
  @Input() matches: Match[];
  @Input() displayOnly: Number;
  
  constructor() { 
    
  }

  ngOnInit() {
    
  }

}
