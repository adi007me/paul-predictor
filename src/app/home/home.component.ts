import { Component, OnInit } from '@angular/core';
import { Match } from '../services/leagues/match';
import { HttpClient } from '@angular/common/http';
import { LeaguesService } from '../services/leagues/leagues.service';
import { TeamsService } from '../services/teams/teams.service';
import { AuthService } from '../services/auth/auth.service';
import { Choice } from '../services/choices/choice';
import { ChoicesService } from '../services/choices/choices.service';

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
  choicesArray: Choice[];

  loading: Boolean;

  constructor(private httpClient: HttpClient,
      private leagues: LeaguesService, private teams: TeamsService, private authService: AuthService,
        private choicesService: ChoicesService) {

    this.loading = true;
    
    leagues.getLeagues().subscribe(leagues => {
      let matches = leagues[0].matches;

      this.matches = matches;
      let currentTime = new Date();
      this.teams.getTeams().subscribe(teams => {
        this.matches.forEach(match => {
          match.team1 = teams.find(team => team.shortName === match.team1_id);
          match.team2 = teams.find(team => team.shortName === match.team2_id);

          let matchTimeAddHour = new Date(match.datetime);
          matchTimeAddHour.setHours(matchTimeAddHour.getHours() - 1);
          match.choiceChangeDisabled = (matchTimeAddHour < currentTime);
          match.sliderValue = 1;
        });

        this.currentBet = this.matches.filter(m => !m.result && m.choiceChangeDisabled);
        this.upcomingMatches = this.matches.filter(m => !m.result && !m.choiceChangeDisabled);
        this.completedMatches = this.matches.filter(m => m.result);
        this.recentMatches = this.matches.filter(m => m.result);
        this.recentMatches.sort(function(a, b){ 
          let dt1 = new Date(b.datetime);
          let dt2 = new Date(a.datetime);

          return (dt1 > dt2 ? 1 : -1);
         });
        this.recentMatches = this.recentMatches.slice(0, 3);

        this.authService.loggedIn.subscribe(() => {
          this.handleLogin();
        });
    
        this.authService.loggedOut.subscribe(() => {
          this.handleLogout();
        });

        if(authService.authStatus) {
          this.getChoices();
        }

        this.loading = false;
      });
    });
  }

  ngOnInit() {
    
  }

  handleLogout() {
    this.choicesArray = null;

    this.matches.forEach(match => {
      match.choice = '';
      match.points = 0;
      match.sliderValue = 1;
    });
  }

  handleLogin() {
    this.getChoices();
  }

  getChoices() {
    this.choicesService.getChoices().subscribe(choices => {
      this.choicesArray = choices;

      this.choicesArray.forEach(choice => {
        let match = this.matches.find(match => match.match_id === choice.match_id);
        
        if (match) {
          match.choice = choice.choice;
          match.points = choice.points;
          match.sliderValue = this.leagues.getSliderValue(match);
        }
      });
    });    
  }
}
