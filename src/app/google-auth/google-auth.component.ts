import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/auth/user';
import { useAnimation } from '@angular/animations';

declare const gapi: any;
declare const window: any;

@Component({
  selector: 'paul-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.less']
})
export class GoogleAuthComponent implements OnInit, AfterViewInit {

  constructor(private changeDetector: ChangeDetectorRef, private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    // window.handleCredentialResponse = this.handleCredentialResponse.bind(this)
    // console.log('callback set')
    window.google.accounts.id.initialize({
      client_id: "169706668013-mvf7ct27e5n709k27cdqd2ostnvoe1qm.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true
    })

    window.google.accounts.id.renderButton(document.getElementById("google-button"), {
      theme: "outline", size: "large", width: "100%"
    })

    window.google.accounts.id.prompt((notification:any) => {console.log(notification)})
  }

  public auth2: any;
  public loggedIn: boolean = false;
  public profileInfo: User = {choices:[],
                              emailId:'',
                              name:'',
                              pictureUrl:'',
                              userId:''};
  public popout: boolean = false;

  // public googleInit() {
  //   gapi.load('auth2', () => {
  //     let auth = gapi.auth2.init({
  //       client_id: '169706668013-mvf7ct27e5n709k27cdqd2ostnvoe1qm.apps.googleusercontent.com',
  //       cookiepolicy: 'single_host_origin',
  //       scope: 'profile email'
  //     })
  //     .then((auth) => {
  //       if (auth.isSignedIn && auth.isSignedIn.get()) {
  //         this.loggedInSuccess.call(this, auth.currentUser.get());
  //       }

  //       this.auth2 = auth;

  //       this.attachSignin(document.getElementById('googleSignIn'));
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  //   });
  // }

  public handleCredentialResponse(res: any) {
    console.log(res)
    try {
      if (res.credential) {
        this.loggedInSuccess(res.credential);
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  public displayProfile() {
    this.popout = true;

    this.changeDetector.detectChanges();
  }

  public closePopup() {
    this.popout = false;

    this.changeDetector.detectChanges();
  }

  loggedInSuccess(credential: any) {
    const token = credential;

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

  // signOut() {
  //   let component = this;
  //   this.popout = false;

  //   this.authService.logout().subscribe(() => {
  //     this.auth2.signOut().then(function () {
  //       component.profileInfo = null;

  //       component.loggedIn = false;

  //       component.changeDetector.detectChanges();
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  ngAfterViewInit() {
    // this.googleInit();
    
  }
}
