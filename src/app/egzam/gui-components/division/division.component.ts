import {Component, Input, Output} from "@angular/core";
import {BoxStorage} from "../../session/box-storage.service";
import {Subject} from "rxjs";

@Component({
  selector: 'kf-div',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent {

  @Input()
  division: string = '';

  @Input()
  divIndex: number = -1;

  @Output()
  boxSelected = new Subject<{divIndex: number, boxIndex: number}>();

  constructor(public storage: BoxStorage) {
  }

  onBoxSelected(boxIndex: number) {
    this.boxSelected.next({
     divIndex: this.divIndex, boxIndex
    });
  }
}
