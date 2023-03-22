import {Injectable} from "@angular/core";
import {LocalStorageService} from "angular-web-storage";

const SETTINGS_KEY = 'settings';

@Injectable({
  providedIn: "root"
})
export class SettingsService{

  private settings: { randomAnswer: boolean, randomQuestion: boolean } = {
    randomAnswer: true,
    randomQuestion: true
  };

  constructor(private local: LocalStorageService) {
    const s = this.local.get(SETTINGS_KEY);
    if (!s) {
      this.store();
    } else {
      if (s.randomQuestion === undefined) {
        s.randomQuestion = true;
      }
      this.settings = s;
    }
  }

  setRandomAnswer(val: boolean) {
    this.settings.randomAnswer = val;
    this.store();
  }

  getRandomAnswer() {
    return this.settings.randomAnswer;
  }

  setRandomQuestion(val: boolean) {
    this.settings.randomQuestion = val;
    this.store();
  }

  getRandomQuestion() {
    return this.settings.randomQuestion;
  }

  private store() {
    this.local.set(SETTINGS_KEY, this.settings, 0);
  }
}
