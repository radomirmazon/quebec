import {Component, Input} from "@angular/core";

@Component({
  selector: 'kf-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent {

  @Input()
  numbersOfCards: number = 0;


}
