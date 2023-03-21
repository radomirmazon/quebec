import {Component, Inject, Input, Output} from "@angular/core";
import {KF, KFAnswer} from "../../generator/egzam.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BoxStorage} from "../../session/box-storage.service";
import {SettingsService} from "../settings/settings.service";

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
  canGiveUp = false;
  canSkip = false;
  answers: KFAnswer[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {question: KF},
              public dialogRef: MatDialogRef<QuestionComponent>,
              private storage: BoxStorage,
              private settings: SettingsService) {
    this.question = data.question;
    this.answers = this.getRandomAnswers(data.question.answers);
    this.thubms = storage.getThumbs(data.question.id);
    setTimeout(() => {
      if (!this.selectedAnswer) {
        this.canGiveUp = true;
      }
    }, 5000);
  }

  onClose() {
    this.dialogRef.close(null);
  }

  onSelected(a: KFAnswer) {
    if (!this.showCorrect && !this.canSkip) {
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

  onGiveUp() {
    this.showCorrect = true;
    this.canSkip = true;
  }

  onSkip() {
    this.dialogRef.close({
      id: this.question.id,
      wasCorrect: null
    });
  }

  getRandomAnswers(array: KFAnswer[]) {
    if (!this.settings.getRandomAnswer()) {
      return array;
    }
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}
