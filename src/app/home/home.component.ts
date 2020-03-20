import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Match } from '../services/leagues/match';
import { HttpClient } from '@angular/common/http';
import { LeaguesService } from '../services/leagues/leagues.service';
import { TeamsService } from '../services/teams/teams.service';
import { AuthService } from '../services/auth/auth.service';
import { Choice } from '../services/choices/choice';
import { ChoicesService } from '../services/choices/choices.service';
import { League } from '../services/leagues/league';

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
        private choicesService: ChoicesService,
        private changeDetector: ChangeDetectorRef) {

    this.loading = true;

    leagues.getLeague().subscribe(league => {
      this.matches = league.matches;
      this.currentBet = league.currentBet
      this.upcomingMatches = league.upcomingMatches;
      this.completedMatches = league.completedMatches;
      this.recentMatches = league.recentMatches;

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

    }, err => console.log(err));
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

    this.changeDetector.detectChanges();
  }

  handleLogin() {
    this.getChoices();

    this.changeDetector.detectChanges();
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

      this.choicesService.choicesSetPerMatch();
      this.changeDetector.detectChanges();
    });
  }
}
