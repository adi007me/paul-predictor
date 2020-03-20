import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllMatchesComponent } from './all-matches/all-matches.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'matches', component: AllMatchesComponent },
  { path: 'leader-board', component: LeaderBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
