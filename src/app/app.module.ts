import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AppMaterialModule } from './app-material.module';

import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { ChoicesService } from './services/choices/choices.service';
import { HttpClientModule } from '@angular/common/http';
import { MatchesModule } from './matches/matches.module';
import { LeaguesService } from './services/leagues/leagues.service';
import { TeamsService } from './services/teams/teams.service';
import { HomeComponent } from './home/home.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { LeaderBoardService } from './services/leader-board/leader-board.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    LeaderBoardComponent
  ],
  entryComponents: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
    MatchesModule
  ],
  providers: [
    AuthService,
    ChoicesService,
    LeaguesService,
    TeamsService,
    LeaderBoardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
