import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';

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
import { BetterListService } from './services/better-list/better-list.service';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { HelpComponent } from './help/help.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { UserStatsService } from './services/user-stats/user-stats.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    LeaderBoardComponent,
    GoogleAuthComponent,
    ProfileInfoComponent,
    HelpComponent,
    UserStatsComponent
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
    MatchesModule,
    ChartsModule,
  ],
  providers: [
    AuthService,
    ChoicesService,
    LeaguesService,
    TeamsService,
    LeaderBoardService,
    BetterListService,
    UserStatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
