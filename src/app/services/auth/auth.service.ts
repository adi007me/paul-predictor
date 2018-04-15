import { Injectable, EventEmitter } from '@angular/core';
import { User } from './user';
import { Constants } from '../services.constants';
import { Observable } from 'rxjs/Observable';
import { RegisterInfo } from './registerInfo';
import { RegisterResult } from './registerResult';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  public authStatus : Boolean;
  public user: User;
  public loading: Boolean;
  public loggedIn: EventEmitter<User> = new EventEmitter<User>();
  public loggedOut: EventEmitter<Boolean> = new EventEmitter();
  
  constructor(public http: HttpClient) {
    this.http.get(Constants.BASE_URL + 'isauthenticated', {withCredentials: true}).subscribe(data => {
      this.authStatus = Boolean(data);
      this.loading = !this.authStatus
      
      if (this.authStatus && !this.user) {
        this.getUser();
      }
    });
  }

  login(userName: String, password: String) : Observable<Boolean> {
    this.loading = true;
    
    return this.http.post<Boolean>(Constants.BASE_URL + 'login', 
    {
      username: userName, 
      password: password
    },
    { withCredentials: true }
    ).map(response => {
      this.getUser();
      this.authStatus = Boolean(response);

      return Boolean(response);
    }).catch(err => {
      this.loading = false;
      return Observable.of(false);
    });
  }

  logout() {
    this.loading = true;

    this.http.get<any>(Constants.BASE_URL + 'logout',
    { withCredentials: true}
    ).subscribe(data => {
      this.authStatus = !data.status;
      this.user = null;
      this.loading = false;

      this.loggedOut.emit(true);
    });
  }

  private getUser() {
    this.http.get<User>(Constants.BASE_URL + 'user',
      { withCredentials: true}    
      ).subscribe(user => {
        this.user = user;
        this.loading = false;

        this.loggedIn.emit(user);
      });
  }

  register(user: RegisterInfo) : Observable<RegisterResult> {
    let registerResult: RegisterResult = {
      isSuccess: false,
      error: ''
    };

    if(user.name && user.password && user.userId) {
      return this.http.post(Constants.BASE_URL + 'register',
        {
          name: user.name,
          userId: user.userId,
          password: user.password
        },
        { withCredentials: true })
        .map(response => {
          registerResult.isSuccess = true;
          registerResult.error = '';
          return registerResult;
        })
        .catch(err => {
          registerResult.error = err.error.error;
          registerResult.isSuccess = false;

          return Observable.of(registerResult);
        });
    } else {
      registerResult.error = 'Missing Information';
      registerResult.isSuccess = false;

      return Observable.of(registerResult);
    }
  }

}
