import {Injectable} from "@angular/core";
import {LocalStorageService} from "angular-web-storage";
import {SESSION_KEY} from "./session.component";
import {kfData} from "../../kf";
import {KF} from "../generator/egzam.component";
import {newKfData} from "../../new-kf";

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

  public canClear = true;

  constructor(private local: LocalStorageService) {
    const s = this.local.get(SESSION_KEY);
    if (!s || s.div.length !== 8) {
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

    this.storage.div.push(this.initItemKf(kfData, 0));
    this.storage.div.push(this.initItemKf(kfData, 1));
    this.storage.div.push(this.initItemKf(kfData, 2));
    this.storage.div.push(this.initItemKf(kfData, 3));

    this.storage.div.push(this.initItemKf(newKfData, 0));
    this.storage.div.push(this.initItemKf(newKfData, 1));
    this.storage.div.push(this.initItemKf(newKfData, 2));
    this.storage.div.push(this.initItemKf(newKfData, 3));

  }

  initItemKf(kf: any, index: number) {
    return {
      item:
        kf[index].q.map((q: KF) => ({
          id: q.id,
          box: 0,
          bad: 0,
          good: 0
        })),
      title: kf[index].name
    };
  }

  getBoxesCounter(division: string): number[] {
    const itemsInTheBox = this.storage.div.filter(d => d.title === division)[0].item;
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

  getDivs(selector: number[]): string[] {
    return this.storage.div.map(d => d.title)
      .filter((i, index) => selector.filter(a => a===index).length > 0);
  }

  getRandomQuestion(divisionName: string, boxIndex: number): KF {
    const qs = this.storage.div.filter(d=> d.title === divisionName)[0].item.filter(i => i.box === boxIndex);
    const randomId =  qs[Math.floor(Math.random()*qs.length)].id;
    return this.getQ(divisionName).q.filter((q: KF)=> q.id === randomId)[0];
  }

  getQ(divisionName: string): any {
    const candidateA: any = kfData.filter(i => i.name === divisionName);
    const candidateB: any = newKfData.filter(i => i.name === divisionName);
    if (candidateA.length === 1) {
      return candidateA[0];
    }
    if (candidateB.length === 1) {
      return candidateB[0];
    }
    return [];
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
    return this.storage.div.flatMap(d => d.item).filter(item => item.id === id || item.id === 'A' + id)[0];
  }

  clear() {
    this.init();
    this.store();
    this.canClear = false;
  }

}
