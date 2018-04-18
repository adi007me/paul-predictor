import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../services/leagues/match';
import { AuthService } from '../../services/auth/auth.service';
import { ChoicesService } from '../../services/choices/choices.service';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'paul-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.less']
})
export class MatchComponent implements OnInit {
  authStatus: Boolean;
  error: String;

  @Input() match: Match;

  constructor(private authService: AuthService, private choicesService: ChoicesService) { }

  ngOnInit() {
    
  }

  choiceChanged(match: Match, matSlideToggleChange: MatSlideToggleChange) {
    let newChoice = null;
    const matchToUpdate = match;
    let choiceChangeDisabled = false;

    const currentTime = new Date();
    let matchTimeAddHour = new Date(match.datetime);
    matchTimeAddHour.setHours(matchTimeAddHour.getHours() - 2);
    choiceChangeDisabled = (matchTimeAddHour < currentTime);
    
    if (choiceChangeDisabled) {
      this.error = 'Choice change is disabled 2 hours before the match';
      matchToUpdate.checked = !matSlideToggleChange.checked;

      return;
    }

    if((matSlideToggleChange.checked && match.choice === match.team2_id) ||
        (!matSlideToggleChange.checked && match.choice === match.team1_id)) {
      return;
    } 

    if(matSlideToggleChange.checked) {
      newChoice = match.team2.shortName
    } else {
      newChoice = match.team1.shortName;
    }

    this.choicesService.updateChoice({match_id: match.match_id, choice: newChoice}).subscribe(response => {
      matchToUpdate.choice = response.choice;
    }
    ,
    error => {
      matchToUpdate.checked = !matSlideToggleChange.checked;
    });    
  }
}
