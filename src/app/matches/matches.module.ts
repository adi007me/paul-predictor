import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match/match.component';
import { MatchListComponent } from './match-list/match-list.component';
import { AppMaterialModule } from '../app-material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule
  ],
  declarations: [MatchComponent, MatchListComponent],
  exports: [MatchListComponent]
})
export class MatchesModule { }
