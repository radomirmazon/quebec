import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {EgzamComponent} from "./egzam/generator/egzam.component";
import {HttpClientModule} from "@angular/common/http";
import {SpellingComponent} from "./egzam/spelling/spelling.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SessionComponent} from "./egzam/session/session.component";
import {AngularWebStorageModule} from "angular-web-storage";
import {HomeComponent} from "./egzam/pages/home/home.component";
import {QuestionComponent} from "./egzam/pages/question/question.component";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {BoxComponent} from "./egzam/gui-components/box/box.component";
import {DivisionComponent} from "./egzam/gui-components/division/division.component";
import {DirectiveElevation} from "./directive-elevation";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {Egzam2Component} from "./egzam/generator/egzam2.component";
import {MatTabsModule} from "@angular/material/tabs";
import {ClearSessionComponent} from "./egzam/pages/clear-session/clear-session.component";
import {SettingsComponent} from "./egzam/pages/settings/settings.component";
import {MatPseudoCheckboxModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {Egzam3Component} from "./egzam/generator/egzam3.component";

@NgModule({
  declarations: [
    AppComponent,
    SpellingComponent,
    EgzamComponent,
    Egzam2Component,
    SessionComponent,
    HomeComponent,
    QuestionComponent,
    BoxComponent,
    DivisionComponent,
    DirectiveElevation,
    ClearSessionComponent,
    SettingsComponent,
    Egzam3Component
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule,
    AngularWebStorageModule, MatDialogModule, MatButtonModule, MatCardModule,
    FlexLayoutModule, MatIconModule, MatTabsModule, MatCheckboxModule
  ],
  providers: [
    QuestionComponent,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
