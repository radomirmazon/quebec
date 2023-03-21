import {Component} from "@angular/core";
import {KF} from "../generator/egzam.component";
import {BoxStorage} from "./box-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {QuestionComponent} from "../pages/question/question.component";
import {ClearSessionComponent} from "../pages/clear-session/clear-session.component";

export const SESSION_KEY = "session_"
const STATE_IDLE = 0;
const STATE_RUNNIG = 1;


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {

  state: number = STATE_IDLE;
  division: string | null = null;
  boxIndex: number | null = null;

  shownQuestionIds: string[] = []

  constructor(public dialog: MatDialog, public storage: BoxStorage) {
  }

  openQuestion(data: KF) {
    let ref = this.dialog.open(QuestionComponent, {
      minWidth: '340px',
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
    this.shownQuestionIds = [];
    this.division = $event.division;
    this.boxIndex = $event.boxIndex;
    this.drawQuestion();
  }

  private drawQuestion() {
    if (this.state === STATE_RUNNIG) {
      // @ts-ignore
      const question = this.storage.getRandomQuestion(this.division, this.boxIndex, this.shownQuestionIds);
      if (question) {
        this.shownQuestionIds.push(question.id);
        this.openQuestion(question);
      } else {
        this.state = STATE_IDLE;
        this.shownQuestionIds = [];
      }
    }
  }

  private run() {
    if (this.state === STATE_RUNNIG) {
      this.drawQuestion()
    }
  }

  onClear() {
    this.dialog.open(ClearSessionComponent, {
      disableClose: false,
      hasBackdrop: true
    });
  }
}
