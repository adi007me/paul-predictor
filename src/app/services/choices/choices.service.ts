import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../services.constants';
import { Choice } from './choice';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChoicesService {

  constructor(private http: HttpClient) { }

  getChoices(): Observable<Choice[]> {
    return this.http.get<Choice[]>(Constants.BASE_URL + 'choices', {withCredentials: true});
  }

  updateChoice(newChoice) {
    return this.http.post<Choice>(Constants.BASE_URL + 'choices',
      {
        choice: {
          match_id: newChoice.match_id,
          choice: newChoice.choice
        }
      },
      { withCredentials: true }
    );
  }

}
