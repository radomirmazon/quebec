import {Component} from "@angular/core";
import {parse} from "angular-html-parser";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-egzam',
  templateUrl: './egzam.component.html'
})
export class EgzamComponent {

  list: { name: string, q: KF[] }[] = [{
    name: '1. Wiadomości techniczne z zakresu radioelektroniki',
    q: []
  }, {
    name: '2. Bezpieczeństwo pracy przy urządzeniach elektrycznych i radiowych',
    q: []
  }, {
    name: '3. Przepisy i procedury operatorskie',
    q: []
  }, {
    name: '4. Przepisy dotyczące radiokomunikacyjnej sużby amatorskiej',
    q: []
  }
  ];

  constructor(private httpClient: HttpClient) {

    this.download('./assets/1.html', 0);
    this.download('./assets/2.html', 1);
    this.download('./assets/3.html', 2);
    this.download('./assets/4.html', 3);
  }

  download(address: string, indexOfList: number) {
    this.httpClient.get(address, {responseType: "text"}).subscribe(data => {
      const d = data.replace(/(\r\n|\n|\r)/gm, "");
      const {rootNodes, errors} = parse(d);
      if (errors.length === 0) {
        this.list[indexOfList].q = this.convert(rootNodes);
      }
    });
  }

  convert(data: any): any {
    const result: KF[] = [];
    let temp: KFAnswer[];
    let root: any;

    data.forEach((item: any) => {

      const td = item.children.filter((c: any) => c.name === 'td')[0];

      if (td.children.length === 1 && td.children[0].children[0].name !== 'img') {

        const a: any = [];
        root = {
          id: td.children[0].children[0].value.split('.')[0],
          answers: a,
          question: td.children[0].children[0].value
        };
        result.push(root);
        temp = a;
      }

      if (td.children.length === 1 && td.children[0].children[0].name === 'img') {
        root.questionImgSrc = 'assets/test_examination/' + td.children[0].children[0].attrs[0].value;
      }

      if (td.children.length === 2) {
        temp.push({
            index: td.children[0].value,
            isCorrect: (td.children[1].attrs[0].value === 'color:#008000'),
            answer: td.children[1].children[0].value
          }
        );
      }
    });
    return result;
  }

  onTest() {
    console.log(this.list[0].q.filter((i) => i.id === '37'));
  }
}

export interface KF {
  id: string,
  answers: KFAnswer[],
  explanation?: string,
  question: string,
  questionImgSrc?: string
}

export interface KFAnswer {
  index: string,
  isCorrect: boolean,
  answer: string
}
