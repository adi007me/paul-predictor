import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LeaguesService } from '../services/leagues/leagues.service';
import { Match } from '../services/leagues/match';
import { AuthService } from '../services/auth/auth.service';
import { ChoicesService } from '../services/choices/choices.service';
import { Choice } from '../services/choices/choice';

@Component({
  selector: 'paul-all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.less']
})
export class AllMatchesComponent implements OnInit {

  matches: Match[];
  loading: Boolean = true;
  choicesArray: Choice[];

  constructor(private leagues: LeaguesService, private authService: AuthService,
      private choicesService: ChoicesService,
      private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.leagues.getLeague().subscribe(league => {
      console.log('league.matches', league.matches);
      this.matches = league.matches;

      this.authService.loggedIn.subscribe(() => {
        this.handleLogin();
      });

      this.authService.loggedOut.subscribe(() => {
        this.handleLogout();
      });

      if(this.authService.authStatus) {
        this.getChoices();
      }

      this.loading = false;
    });
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
