import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/auth/user';

declare const gapi: any;

@Component({
  selector: 'paul-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.less']
})
export class GoogleAuthComponent implements OnInit, AfterViewInit {

  constructor(private changeDetector: ChangeDetectorRef, private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {

  }

  public auth2: any;
  public loggedIn: boolean = false;
  public profileInfo: User = {choices:[],
                              emailId:'',
                              name:'',
                              pictureUrl:'',
                              userId:''};
  public popout: boolean = false;

  public googleInit() {
    gapi.load('auth2', () => {
      let auth = gapi.auth2.init({
        client_id: '169706668013-mvf7ct27e5n709k27cdqd2ostnvoe1qm.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      })
      .then((auth) => {
        if (auth.isSignedIn && auth.isSignedIn.get()) {
          this.loggedInSuccess.call(this, auth.currentUser.get());
        }

        this.auth2 = auth;

        this.attachSignin(document.getElementById('googleSignIn'));
      })
      .catch(error => {
        console.error(error);
      });
    });
  }

  public attachSignin(element) {
    const component = this;

    this.auth2.attachClickHandler(element, {},
      this.loggedInSuccess.bind(this), function (error) {
        // TODO Show error in dialog
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  public displayProfile() {
    this.popout = true;

    this.changeDetector.detectChanges();
  }

  public closePopup() {
    this.popout = false;

    this.changeDetector.detectChanges();
  }

  loggedInSuccess(googleUser) {
      let profile = googleUser.getBasicProfile();

      const token = googleUser.getAuthResponse().id_token;

      this.authService.authenticate(token).subscribe((user: User) => {
        this.profileInfo = user;

        this.loggedIn = true;
        this.changeDetector.detectChanges();
      }, err => console.log('Login Error', err));
  }

  accountInfoPopover() {
    let dialogRef = this.dialog.open(ProfileInfoComponent, {
      width: '250px'
    });
  }

  signOut() {
    let component = this;
    this.popout = false;

    this.authService.logout().subscribe(() => {
      this.auth2.signOut().then(function () {
        component.profileInfo = null;

        component.loggedIn = false;

        component.changeDetector.detectChanges();
      }).catch(error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
