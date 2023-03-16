import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {KF} from "./egzam.component";

@Component({
  selector: 'app-egzam2',
  templateUrl: './egzam.component.html'
})
export class Egzam2Component {

  list: { name: string, q: KF[] }[] = [{
    name: 'dział 1 - RADIOTECHNIKA',
    q: []
  }, {
    name: 'dział 2 - BHP',
    q: []
  }, {
    name: 'dział 3 - PROCEDURY I ZWYCZAJE OPERATORSKIE',
    q: []
  }, {
    name: 'dział 4 - PRZEPISY DOTYCZĄCE RADIOKOMUNIKACYJNEJ SŁUŻBY AMATORSKIEJ',
    q: []
  }
  ];

  constructor(private httpClient: HttpClient) {
    //kat A
    this.download('./assets/nowy/a/dzial1a_.csv', 0);
    this.download('./assets/nowy/a/dzial2a_.csv', 1);
    this.download('./assets/nowy/a/dzial3a_.csv', 2);
    this.download('./assets/nowy/a/dzial4a_.csv', 3);

    //kat C
    //this.download('./assets/nowy/a/dzial1c.html', 0);
    //this.download('./assets/nowy/a/dzial2c.html', 1);
    //this.download('./assets/nowy/a/dzial3c.html', 2);
    //this.download('./assets/nowy/a/dzial4c.html', 3);
  }

  download(address: string, indexOfList: number) {
    this.httpClient.get(address, {responseType: "text"}).subscribe(data => {
      const lines: string[] = data.split("\r\n");
      const header: string[] = lines[0].split(",");
      const csvData: string[][] = lines
        .filter((l, index)=> index != 0)
        .map(l => l.split(",").map(i => i.replace(/(\\\")/gm, "'").replace(/(\")/gm, "").replace("^", ","))
        );
      const csbJson: CSVJSON[] = csvData.map(i => ({
        id: 'A' + i[0],
        pytanie: i[1],
        ilustracja: i[2] === ''?'':'https://hackerspacekrk.github.io/pytania-egzaminacyjne/ilustracje/' + i[2],
        odpa: i[3],
        odpb: i[4],
        odpc: i[5]
      }));

      this.list[indexOfList].q = this.convert(csbJson);

    });
  }

  convert(data: CSVJSON[]): KF[] {
    return data.map((i: CSVJSON) => ({
      id: i.id,
      questionImgSrc: i.ilustracja,
      question: i.pytanie,
      answers: [
        {
          index: 'a',
          answer: i.odpa,
          isCorrect: false
        },
        {
          index: 'b',
          answer: i.odpb,
          isCorrect: false
        },
        {
          index: 'c',
          answer: i.odpc,
          isCorrect: false
        }
      ]
    }));
  }
}

interface CSVJSON {
  id: string,
  pytanie: string,
  ilustracja: string,
  odpa: string,
  odpb: string,
  odpc: string
}
