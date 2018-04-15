import { Component, OnInit } from '@angular/core';
import { RegisterInfo } from '../services/auth/registerInfo';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'paul-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  message: {
    text: String,
    type: String
  };
  registerView: Boolean;
  registerInfo: RegisterInfo;
  
  constructor(public authProvider: AuthService) {
    this.registerInfo = {
      name: '',
      password: '',
      confirmPassword: '',
      userId: ''
    };

    this.setMessage('', '');
  }

  private setMessage(text, type) {
    this.message = {
      text: text,
      type: type
    };
  }

  login() {
    this.setMessage('', '');

    if (this.username && this.password) {
      this.authProvider.login(this.username, this.password).subscribe(response => {
        if(!response) {
          this.setMessage('Unable to Login', 'error');
        } else {
          this.setMessage('Login Successful', 'success');
        }
      });
    } else {
      this.setMessage('Please provide Username and Password', 'error');
    }
  }

  logout() {
    this.authProvider.logout();
    this.setMessage('', '');
  }

  showRegisterView() {
    this.registerView = true;
    this.setMessage('', '');
  }

  register() {
    this.setMessage('', '');

    if(!this.registerInfo || !this.registerInfo.userId || !this.registerInfo.password 
      || !this.registerInfo.confirmPassword || !this.registerInfo.name) {
      this.setMessage('Please provide all info', 'error');
    }

    if (this.registerInfo && this.registerInfo.password !== this.registerInfo.confirmPassword) {
      this.setMessage('Confirm Password Invalid', 'error');
    } else {
      this.authProvider.register(this.registerInfo).subscribe(registerResult => {
        console.log(registerResult);
        if(!registerResult.isSuccess) {
          if(registerResult.error.indexOf('Duplicate UserName') > -1) {
            this.setMessage('Please select another user name', 'error');
          } else if (registerResult.error.indexOf('Duplicate Email') > -1){
            this.setMessage('Duplicate Email Id', 'error');
          }
        } else {
          this.registerView = false;
          this.setMessage('Registered Successfully. Please login', 'success');
        }
      });
    }
  }

  registrationCancelled() {
    this.registerView = false;
    this.setMessage('' ,'');
  }

  ngOnInit() {

  }
}
