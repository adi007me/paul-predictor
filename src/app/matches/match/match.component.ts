import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Match } from '../../services/leagues/match';
import { AuthService } from '../../services/auth/auth.service';
import { ChoicesService } from '../../services/choices/choices.service';
import { MatSliderChange } from '@angular/material/slider';
import { LeaguesService } from '../../services/leagues/leagues.service';

@Component({
  selector: 'paul-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.less']
})
export class MatchComponent implements OnInit {
  loggedIn: Boolean;
  error: String;
  isSemiFinal: Boolean;
  isFinal: Boolean;

  @Input() match: Match;

  constructor(public authService: AuthService,
    private choicesService: ChoicesService,
    private leagues : LeaguesService,
    private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.isSemiFinal = this.match.match_id.includes('sm');
    this.isFinal = this.match.match_id.includes('final');

    this.match.displayId = this.match.match_id.replace('match', '#').replace('sm', 'Q').replace('final', 'F');

    this.loggedIn = this.authService.authStatus;

    this.authService.loggedIn.subscribe(user => {
      this.changeDetector.detectChanges();
    });

    this.authService.loggedOut.subscribe(status => {
      this.loggedIn = false;

      this.changeDetector.detectChanges();
    })

    this.choicesService.choicesSet.subscribe(() => {
      this.loggedIn = true;
      this.changeDetector.detectChanges();
    })
  }

  choiceChanged(match: Match, matSliderChange: MatSliderChange) {
    let newChoice = null;
    const matchToUpdate = match;
    let choiceChangeDisabled = false;

    const currentTime = new Date();
    let matchTime = new Date(match.datetime);


    let oldSliderValue = this.leagues.getSliderValue(match);

    if(matSliderChange.value === oldSliderValue) {
      return;
    }

    newChoice = this.leagues.getChoiceValue(matSliderChange.value, match);

    this.choicesService.updateChoice({match_id: match.match_id, choice: newChoice}).subscribe(response => {
      matchToUpdate.choice = response.choice;
      matchToUpdate.sliderValue = matSliderChange.value;
    }
    ,
    error => {
      matchToUpdate.sliderValue = this.leagues.getSliderValue(matchToUpdate);
    });
  }

  formatLabel() {
    let component = this;

    return (value: number) => {
      if (value == 1) {
        return "Draw";
      }

      if (value == 0) {
        return component.match.team1_id;
      }

      if (value == 2) {
        return component.match.team2_id;
      }
    }
  }
}
