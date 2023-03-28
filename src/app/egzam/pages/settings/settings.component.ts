import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {SettingsService} from "./settings.service";

@Component({
  template: `
    <mat-card-content>
      <mat-checkbox [checked]="settings.getSettings().randomAnswer" (change)="onSelectA($event)">Czy losować kolejność wyświetlanych odpowiedzi (ABC)</mat-checkbox>
    </mat-card-content>
    <mat-card-content>
      <mat-checkbox [checked]="settings.getSettings().randomQuestion" (change)="onSelectQ($event)">Czy losować kolejność pytań pobieranych z pudełka</mat-checkbox>
    </mat-card-content>
    <mat-card-content>
      <mat-checkbox [checked]="settings.getSettings().ka" (change)="onSelectKA($event)">
        <span *ngIf="settings.getSettings().ka">Pokazuję wszystkie pytania</span>
        <span *ngIf="!settings.getSettings().ka">Pokazuję tylko pytania na które znam odpowiedź</span></mat-checkbox>
    </mat-card-content>
    <mat-card-footer>
      <button mat-flat-b0tton (click)="onClose()">Zamknij</button>
    </mat-card-footer>
  `
})
export class SettingsComponent {

  constructor(private ref: MatDialogRef<SettingsComponent>, public settings: SettingsService) {

  }

  onClose() {
    this.ref.close();
  }

  onSelectQ($event: MatCheckboxChange) {
    this.settings.setRandomQuestion($event.checked);
  }

  onSelectA($event: MatCheckboxChange) {
    this.settings.setRandomAnswer($event.checked);
  }

  onSelectKA($event: MatCheckboxChange) {
    this.settings.setKA($event.checked);
  }
}
