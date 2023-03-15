import {Component, Inject, Input, Output} from "@angular/core";
import {KF, KFAnswer} from "../../generator/egzam.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BoxStorage} from "../../session/box-storage.service";

@Component({
  selector: 'kf-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  question: KF;
  showCorrect = false;
  selectedAnswer: KFAnswer | null = null;
  thubms: {up: number, down: number} = {up:0, down:0};

  constructor(@Inject(MAT_DIALOG_DATA) public data: {question: KF},
              public dialogRef: MatDialogRef<QuestionComponent>,
              private storage: BoxStorage) {
    this.question = data.question;
    this.thubms = storage.getThumbs(data.question.id);
  }

  onClose() {
    this.dialogRef.close(null);
  }

  onSelected(a: KFAnswer) {
    if (!this.showCorrect) {
      this.showCorrect = true;
      this.selectedAnswer = a;
    }
  }

  onNext() {
    this.dialogRef.close({
      id: this.question.id,
      wasCorrect: this.selectedAnswer?.isCorrect
    });
  }
}
