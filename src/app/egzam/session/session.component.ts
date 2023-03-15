import {Component, OnInit} from "@angular/core";
import {KF} from "../generator/egzam.component";
import {LocalStorageService} from "angular-web-storage";
import {BoxStorage} from "./box-storage.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {QuestionComponent} from "../pages/question/question.component";
import {debounce, debounceTime, filter, take} from "rxjs";

export const SESSION_KEY = "session_"
const STATE_IDLE = 0;
const STATE_RUNNIG = 1;


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html'
})
export class SessionComponent {

  state: number = STATE_IDLE;
  divIndex: number | null = null;
  boxIndex: number | null = null;

  constructor(public dialog: MatDialog, private storage: BoxStorage) {
  }

  openQuestion(data: KF) {
    let ref = this.dialog.open(QuestionComponent, {
      /*height: '400px',
      width: '600px',*/
      data: {question: data},
      disableClose: true,
      hasBackdrop: true
    });

    ref.beforeClosed().subscribe(result => {
      if (result == null) {
        this.state = STATE_IDLE;
        this.divIndex = null;
        this.boxIndex = null;
      } else {
        this.storage.setAnswer(result);
      }
      this.run();
    });
  }

  onSelected($event: { divIndex: number, boxIndex: number }) {
    this.state = STATE_RUNNIG;
    this.divIndex = $event.divIndex;
    this.boxIndex = $event.boxIndex;
    this.drawQuestion();
  }

  private drawQuestion() {
    if (this.state === STATE_RUNNIG) {
      // @ts-ignore
      this.openQuestion(this.storage.getRandomQuestion(this.divIndex, this.boxIndex));
    }
  }

  private run() {
    if (this.state === STATE_RUNNIG) {
      this.drawQuestion()
    }
  }

}
