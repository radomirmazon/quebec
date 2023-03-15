import {Injectable} from "@angular/core";
import {LocalStorageService} from "angular-web-storage";
import {SESSION_KEY} from "./session.component";
import {kfData} from "../../kf";
import {KF} from "../generator/egzam.component";

interface BoxStorageInterface {
  div: {
    title: string,
    item: BoxStorageItem[]
  }[]
};

interface BoxStorageItem {
  id: string,
  good: number,
  bad: number,
  box: number
}

@Injectable({
  providedIn: "root"
})
export class BoxStorage {

  storage: BoxStorageInterface = {
    div: []
  };

  constructor(private local: LocalStorageService) {
    const s = this.local.get(SESSION_KEY);
    if (!s) {
      this.init();
      this.store();
    } else {
      this.storage = s;
    }
  }

  init() {
    this.storage = {
      div: []
    };


    this.storage.div.push(this.initItem(0));
    this.storage.div.push(this.initItem(1));
    this.storage.div.push(this.initItem(2));
    this.storage.div.push(this.initItem(3));


  }

  initItem(index: number) {
    return {
      item:
        kfData[index].q.map(q => ({
          id: q.id,
          box: 0,
          bad: 0,
          good: 0
        })),
      title: kfData[index].name
    };
  }

  getBoxesCounter(divIndex: number): number[] {
    const itemsInTheBox = this.storage.div[divIndex].item;
    const boxesCounter: number[] = [];
    itemsInTheBox.forEach(item => {
      const index = item.box;
      if (boxesCounter[index] === undefined) {
        boxesCounter[index] = 0;
      }
      boxesCounter[index]++;
    })
    return boxesCounter;
  }

  getDivs(): string[] {
    return this.storage.div.map(d => d.title);
  }

  getRandomQuestion(divIndex: number, boxIndex: number): KF {
    const qs = this.storage.div[divIndex].item.filter(i => i.box == boxIndex);
    const randomId =  qs[Math.floor(Math.random()*qs.length)].id;
    return kfData[divIndex].q.filter(q=> q.id === randomId)[0];
  }

  setAnswer(result: { id: string, wasCorrect: boolean}) {
    const a = this.getItemById(result.id);
    if (result.wasCorrect) {
      a.box++;
      a.good++
    } else {
      a.box = 0;
      a.bad++;
    }
    this.store();
  }

  private store() {
    this.local.set(SESSION_KEY, this.storage, 0);
  }

  getThumbs(id: string) {
    const a = this.getItemById(id);
    return {down: a.bad, up: a.good};
  }

  private getItemById(id: string) {
    return this.storage.div.flatMap(d => d.item).filter(item => item.id === id)[0];
  }
}
