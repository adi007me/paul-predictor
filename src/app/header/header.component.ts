import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';

@Component({
  selector: 'paul-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  accountPopover() {
    let dialogRef = this.dialog.open(ProfileInfoComponent, {
      width: '250px'
    });


  }

}
