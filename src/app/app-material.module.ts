import '../polyfills';

import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatCardModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  exports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ]
})
export class AppMaterialModule {}
