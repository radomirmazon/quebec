import {Injectable} from "@angular/core";
import {LocalStorageService} from "angular-web-storage";
import {SESSION_KEY} from "./session.component";
import {kfData} from "../../kf";

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
export class BoxStoage {

  storage: BoxStorageInterface = {
    div: []
  };

  constructor(private local: LocalStorageService) {
    const s = this.local.get(SESSION_KEY);
    if (!s) {
      this.init();
      this.local.set(SESSION_KEY, this.storage, 0);
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
}
