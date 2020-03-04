import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';

declare const gapi: any;

@Component({
  selector: 'paul-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.less']
})
export class GoogleAuthComponent implements OnInit, AfterViewInit {

  constructor(private changeDetector: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  public auth2: any;
  public loggedIn: boolean = false;
  public profileImage: string = '';
  public profileInfo: any = {};

  public googleInit() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '404042679583-o3ndihu0l83lje6q68408norqtp6ul6q.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      }).then((auth) => {
        console.log(auth.isSignedIn.get())

        if (auth.isSignedIn && auth.isSignedIn.get()) {
          this.loggedInSuccess.call(this, auth.currentUser.get());
        }

        this.auth2 = auth;

        this.attachSignin(document.getElementById('googleSignIn'));
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

  loggedInSuccess(googleUser) {
      console.log('inside loggedInSuccess', googleUser);
      let profile = googleUser.getBasicProfile();

      //TODO : send token to BE service
      console.log('Token || ' + googleUser.getAuthResponse().id_token);

      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());

      let profileInfo = {
        id: profile.getId(),
        name: profile.getName(),
        imageUrl: profile.getImageUrl(),
        email: profile.getEmail()
      };

      this.profileInfo = profileInfo;

      this.loggedIn = true;
      this.profileImage = profile.getImageUrl();

      this.changeDetector.detectChanges();
  }

  accountInfoPopover() {
    let dialogRef = this.dialog.open(ProfileInfoComponent, {
      width: '250px'
    });
  }

  signOut() {
    let component = this;

    this.auth2.signOut().then(function () {
      console.log('User signed out.');

      component.profileInfo = {};

      component.loggedIn = false;

      component.changeDetector.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
