import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SettingsComponent} from "./egzam/pages/settings/settings.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  meaning = ['miedzynarodowa', 'polski', 'angielski', 'amerykański', 'rosyjski', 'czeski', 'niemiecki',
    'francuski', 'włoski', 'hiszpańsk'];
  names = {
    'A': ['Alfa', 'Adam', 'Abel', 'Adam', 'Anna', 'Adam', 'Amerika', 'Amerique', 'Antenna', 'Antenna'],
    'B': ['Bravo', 'Barbara', 'Boston', 'Baker', 'Boris', 'Bożena', 'Berta', 'Boston', 'Bologna', 'Bateria'],
    'C': ['Charlie', 'Cezary', 'Canada', 'Charlie', 'Centralnyj', 'Cyril', 'Casar', 'Casablanca', 'Calabria', 'Canada'],
    'Ć': ['Charlie', 'Ćma', 'Canada', 'Charlie', 'Centralnyj', 'Cyril', 'Casar', 'Casablanca', 'Calabria', 'Canada'],
    'D': ['Delta', 'Dorota', 'David', 'David', 'Dimitrij', 'David', 'Dora', 'Dinamarqe', 'Danimarca', 'Dinamarca'],
    'E': ['Echo', 'Ewa', 'England', 'Edward', 'Jeliena', 'Emil', 'Emil', 'Europe', 'Europa', 'Europa'],
    'F': ['Foxtrott', 'Franciszek', 'Fox', 'Framk', 'Fiodor', 'Frantisek', 'Friedrich', 'Francois', 'Fireze', 'Filamento'],
    'G': ['Golf', 'Grazyna', 'Germany', 'George', 'Grigorij', 'Gustav', 'Gustav', 'Geneve', 'Granda', 'Granda'],
    'H': ['Hotel', 'Henryk', 'Henry', 'Henry', 'Hariton', 'Helena', 'Heinrich', 'Honolulu', 'Honolulu', 'Holanda'],
    'I': ['India', 'Irena', 'Italy', 'Ida', 'Iwan', 'Ivan', 'Italien', 'Italie', 'Italia', 'Italia'],
    'J': ['Juliet', 'Jadwiga', 'Japan', 'John', 'Iwan Kratkij', 'Josef', 'Julius', 'Japon', 'i luogo', 'Japon'],
    'K': ['Kilo', 'Karol', 'Kentucky', 'King', 'Konstantin', 'Karel', 'Karl', 'Kilowatt', 'Kappa', 'Kilometro'],
    'L': ['Lima', 'Ludwik', 'London', 'Lewis', 'Lieonid', 'Ludvik', 'Ludwig', 'Lima', 'Londra', 'Lampara'],
    'Ł': ['Lima', 'ŁUKASZ', 'London', 'Lewis', 'Lieonid', 'Ludvik', 'Ludwig', 'Lima', 'Londra', 'Lampara'],
    'M': ['Mike', 'Maria', 'Mexico', 'Mary', 'Maria', 'Marie', 'Marta', 'Madagascar', 'Milano', 'Mexico'],
    'N': ['November', 'Natalia', 'Norway', 'Nancy', 'Nikołaj', 'Neruda', 'Norwegen', 'Norwegen', 'Napoli', 'Nicaragua'],
    'Ń': ['November', 'Koń', 'Norway', 'Nancy', 'Nikołaj', 'Neruda', 'Norwegen', 'Norwegen', 'Napoli', 'Nicaragua'],
    'O': ['Oscar', 'Olga', 'Ocean', 'Otto', 'Olga', 'Otakar', 'Otto', 'Ontario', 'Ontario', 'Ontario'],
    'P': ['Papa', 'Paweł', 'Portugal', 'Peter', 'Pawieł', 'Petr', 'Paul', 'Paris', 'Panama', 'Portugal'],
    'Q': ['Quebec', 'Quebec', 'Quebec', 'Queen', 'Szczuka', 'Quido', 'Quebec', 'Quebec', 'Quito', 'Quito'],
    'R': ['Romeo', 'Roman', 'Radio', 'Robert', 'Roman', 'Rudolf', 'Radio', 'Radio', 'Roma', 'Radio'],
    'S': ['Sierra', 'Stefan', 'Sugar', 'Susan', 'Siergij', 'Svatopluk', 'Siegfried', 'Santiago', 'Sorrento', 'Santiago'],
    'Ś': ['Sierra', 'Światowid', 'Sugar', 'Susan', 'Siergij', 'Svatopluk', 'Siegfried', 'Santiago', 'Sorrento', 'Santiago'],
    'T': ['Tango', 'Tadeusz', 'Texas', 'Thomas', 'Tatiana', 'Tomas', 'Texas', 'Texas', 'Torino', 'Turquia'],
    'U': ['Uniform', 'Urszula', 'United', 'Union', 'Uliana', 'Urban', 'Urlich', 'Union', 'Unione', 'Universita'],
    'V': ['Victor', 'Violetta', 'Victor', 'Victor', 'Żenia (Żuk)', 'Vaclav', 'Venezuela', 'Victoire', 'Venezia', 'Victoria'],
    'W': ['Whiskey', 'Wanda', 'Washinghton', 'William', 'Wasilij', 'dvojite ve', 'Wilhelm', 'Double We', 'V Doppio', 'Washinghton'],
    'X': ['X-ray', 'Xsantypa', 'X-ray', 'X-ray', 'Miakkij Znak', 'Xaver', 'Xantippe', 'Xantippe', 'Xylofono', 'Xylofono'],
    'Y': ['Yankee', 'Ypsylon', 'Yesterday', 'Young', 'Igrak', 'Ypsilon', 'Ypsilon', 'Ygrec', 'i greco', 'Yucatan'],
    'Z': ['Zulu', 'Zygmunt', 'Zebra', 'Zebra', 'Zinajda', 'Zuzana', 'Zeppelin', 'Zanzibar', 'Zelanda', 'Zelanda'],
    'Ż': ['Zulu', 'Żaba', 'Zebra', 'Zebra', 'Zinajda', 'Zuzana', 'Zeppelin', 'Zanzibar', 'Zelanda', 'Zelanda'],
    'Ź': ['Zulu', 'Źrebak', 'Zebra', 'Zebra', 'Zinajda', 'Zuzana', 'Zeppelin', 'Zanzibar', 'Zelanda', 'Zelanda']
  }

  constructor(public dialog: MatDialog) {
  }

  set name(n: string) {
    this._name = n.toUpperCase();
    this.calculate()
  }

  _name: string = '';

  spelling_pl: string[] = [];
  spelling_int: string[] = [];

  private calculate() {

    this.spelling_pl = [];
    this.spelling_int = [];

    this._name.split('').forEach(l => {
      if (this.containsOnlyNumbers(l)) {
        this.spelling_pl.push(l);
        this.spelling_int.push(l);
        return;
      }

      // @ts-ignore
      const nameArray: string[] = this.names[l];
      if (nameArray) {
        this.spelling_pl.push(nameArray[1]);
        this.spelling_int.push(nameArray[0]);
      }
    });
  }

  containsOnlyNumbers(s: string) {
    return /^\d+$/.test(s);
  }

  onSettings() {
    this.dialog.open(SettingsComponent, {
      disableClose: false,
      hasBackdrop: true
    });
  }
}

