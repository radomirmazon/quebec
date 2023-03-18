import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {BoxStorage} from "../../session/box-storage.service";

@Component({
  template: `
  UWAGA! Stracisz zapisane postępy
  <div>
    <button mat-raised-button color="warn" (click)="onClear()">Usuń</button>
    <button mat-flat-button (click)="onCancel()">Anuluj</button>
  </div>
  `
})
export class ClearSessionComponent {

  constructor(public dialogRef: MatDialogRef<ClearSessionComponent>,
              private boxStorage: BoxStorage) {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onClear() {
    this.boxStorage.clear();
    this.dialogRef.close();
  }
}
