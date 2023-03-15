import {Component, OnInit, Output} from "@angular/core";
import {BoxStorage} from "../../session/box-storage.service";
import {Subject} from "rxjs";

@Component({
  selector: 'kf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  divs: string[] = [];


  @Output()
  boxSelected = new Subject<{divIndex: number, boxIndex: number}>();

  constructor(public storage: BoxStorage) {
  }

  ngOnInit() {
    this.divs = this.storage.getDivs();
  }


  onBoxSelected($event: any) {
    this.boxSelected.next($event)
  }
}
