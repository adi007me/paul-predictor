import { Component, OnInit, Input } from '@angular/core';
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
  authStatus: Boolean;
  error: String;
  isSemiFinal: Boolean;
  isFinal: Boolean;

  @Input() match: Match;

  constructor(public authService: AuthService, private choicesService: ChoicesService, private leagues : LeaguesService) {

  }

  ngOnInit() {
    this.isSemiFinal = this.match.match_id.includes('sm');
    this.isFinal = this.match.match_id.includes('final');
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
}
