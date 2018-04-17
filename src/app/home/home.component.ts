import { Component, OnInit } from '@angular/core';
import { Match } from '../services/leagues/match';
import { HttpClient } from '@angular/common/http';
import { LeaguesService } from '../services/leagues/leagues.service';
import { TeamsService } from '../services/teams/teams.service';

@Component({
  selector: 'paul-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  matches: Match[];
  completedMatches: Match[];
  upcomingMatches: Match[];
  recentMatches: Match[];
  currentBet: Match[];

  constructor(private httpClient: HttpClient,
      private leagues: LeaguesService, private teams: TeamsService) {
    leagues.getLeagues().subscribe(leagues => {
      let matches = leagues[0].matches;

      this.matches = matches; 
      var currentTime = new Date();
      this.teams.getTeams().subscribe(teams => {
        this.matches.forEach(match => {
          match.team1 = teams.find(team => team.shortName === match.team1_id);
          match.team2 = teams.find(team => team.shortName === match.team2_id);

          var matchTimeAddHour = new Date(match.datetime);
          matchTimeAddHour.setHours(matchTimeAddHour.getHours() - 2);
          match.choiceChangeDisabled = (matchTimeAddHour < currentTime);
          match.currentChoice = false;
          match.isSelected = false;
        });

        this.currentBet = this.matches.filter(m => !m.result && m.choiceChangeDisabled);
        this.upcomingMatches = this.matches.filter(m => !m.result && !m.choiceChangeDisabled).slice(0, 2);
        this.completedMatches = this.matches.filter(m => m.result);
        this.recentMatches = this.matches.filter(m => m.result);
        this.recentMatches.sort(function(a, b){ 
          let dt1 = new Date(b.datetime);
          let dt2 = new Date(a.datetime);

          return (dt1 > dt2 ? 1 : -1);
         });
         this.recentMatches = this.recentMatches.slice(0, 3);
      });
    });
  }

  ngOnInit() {
  }

}
