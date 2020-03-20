import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match/match.component';
import { MatchListComponent } from './match-list/match-list.component';
import { AppMaterialModule } from '../app-material.module';
import { FormsModule } from '@angular/forms';
import { BettersListComponent } from './betters-list/betters-list.component';
import { PredictionsComponent } from './predictions/predictions.component';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule
  ],
  declarations: [MatchComponent, MatchListComponent, BettersListComponent, PredictionsComponent],
  exports: [MatchListComponent]
})
export class MatchesModule { }
