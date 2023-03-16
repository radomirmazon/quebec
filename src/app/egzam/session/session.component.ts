import {Component} from "@angular/core";
import {KF} from "../generator/egzam.component";
import {BoxStorage} from "./box-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {QuestionComponent} from "../pages/question/question.component";

export const SESSION_KEY = "session_"
const STATE_IDLE = 0;
const STATE_RUNNIG = 1;


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styles: [`.footer {font-size: small; position: absolute; bottom: 10px}`]
})
export class SessionComponent {

  state: number = STATE_IDLE;
  division: string | null = null;
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
        this.division = null;
        this.boxIndex = null;
      } else {
        this.storage.setAnswer(result);
      }
      this.run();
    });
  }

  onSelected($event: { division: string, boxIndex: number }) {
    this.state = STATE_RUNNIG;
    this.division = $event.division;
    this.boxIndex = $event.boxIndex;
    this.drawQuestion();
  }

  private drawQuestion() {
    if (this.state === STATE_RUNNIG) {
      // @ts-ignore
      this.openQuestion(this.storage.getRandomQuestion(this.division, this.boxIndex));
    }
  }

  private run() {
    if (this.state === STATE_RUNNIG) {
      this.drawQuestion()
    }
  }

}
