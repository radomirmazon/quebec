import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {SettingsService} from "./settings.service";

@Component({
  template: `
    <mat-card-content>
      <mat-checkbox [checked]="randomAnswer" (change)="onSelect($event)">Czy losować kolejność wyświetlanych pytań (ABC)</mat-checkbox>
    </mat-card-content>
    <mat-card-footer>
      <button mat-flat-button (click)="onClose()">Zamknij</button>
    </mat-card-footer>
  `
})
export class SettingsComponent {

  randomAnswer;

  constructor(private ref: MatDialogRef<SettingsComponent>, private settings: SettingsService) {
    this.randomAnswer = this.settings.getRandomAnswer();
  }

  onClose() {
    this.ref.close();
  }

  onSelect($event: MatCheckboxChange) {
    this.settings.setRandomAnswer($event.checked);
  }
}
