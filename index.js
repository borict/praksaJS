const fs = require("fs");

class Doktor {
  constructor(ime, prezime, specijalizacija) {
    this.ime = ime;
    this.prezime = prezime;
    this.specijalizacija = specijalizacija;
    this.pacijenti = [];
  }
  zakaziPregled(pacijent, tipTesta, datumTesta) {
    let labPregled = new LabPregled(tipTesta, datumTesta);
    pacijent.labPregledi.push(labPregled);
    console.log(
      `Zakazan pregled ${tipTesta.tip} za pacijenta: ${pacijent.ime} ${pacijent.prezime}, termin je: ${datumTesta}.`
    );
    logAction(
      `Zakazan pregled ${tipTesta.tip} za pacijenta: ${pacijent.ime} ${pacijent.prezime}, termin je: ${datumTesta}.`
    );
  }
}
class Pacijent {
  constructor(ime, prezime, jmbg, brojKartona) {
    this.ime = ime;
    this.prezime = prezime;
    this.jmbg = jmbg;
    this.brojKartona = brojKartona;
    this.doktor = null;
    this.labPregledi = [];
  }
  izaberiDoktora(pacijent, doktor) {
    this.doktor = doktor;
    doktor.pacijenti.push(pacijent);
    console.log(
      `Doktor ${doktor.ime} ${doktor.prezime} je izabran doktor za pacijenta  ${this.ime} ${this.prezime}.`
    );
    logAction(
      `Doktor ${doktor.ime} ${doktor.prezime} je izabran doktor za pacijenta  ${this.ime} ${this.prezime}.`
    );
  }

  obaviPregled(tipPregleda, rezultat) {
    console.log(
      `Pacijent ${this.ime} ${this.prezime} obavlja pregled ${tipPregleda} i rezultat je ${rezultat}.`
    );
    logAction(
      `Pacijent ${this.ime} ${this.prezime} obavlja pregled ${tipPregleda} i rezultat je ${rezultat}.`
    );
  }
}

class LabPregled {
  constructor(datum, tip, rezultat) {
    this.datum = datum;
    this.tip = tip;
    this.rezultat = rezultat;
  }
}
class KrvniPritisak extends LabPregled {
  constructor(datum, tip, rezultat, gornjaVrednost, donjaVrednost, puls) {
    super(datum, tip, rezultat);
    this.gornjaVrednost = gornjaVrednost;
    this.donjaVrednost = donjaVrednost;
    this.puls = puls;
    this.rezultat = `${this.gornjaVrednost}/${this.donjaVrednost}, puls je: ${this.puls}`;
  }
}

class NivoSeceraUKrvi extends LabPregled {
  constructor(datum, tip, rezultat, vremePoslednjegObroka) {
    super(datum, tip, rezultat);
    this.vremePoslednjegObroka = vremePoslednjegObroka;
  }
}

class NivoHolesterolaUKrvi extends LabPregled {
  constructor(datum, tip, rezultat, vremePoslednjegObroka) {
    super(datum, tip, rezultat);
    this.vremePoslednjegObroka = vremePoslednjegObroka;
  }
}

function logAction(action) {
  const now = new Date();
  const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  fs.appendFileSync("tp.txt", `[${timestamp}] ${action}\n`);
}

const milan = new Doktor("Milan", "Bajic", "kardiolog");
console.log(`Kreiran je doktor ${milan.ime} ${milan.prezime}`);
logAction(
  `Kreiran je doktor:  ${milan.ime} ${milan.prezime}, specijalizalizacija:  ${milan.specijalizacija}.`
);

const dragan = new Pacijent("Dragan", "Kojic", 1234567891234, 12345678912);
console.log(`Kreiran je pacijent ${dragan.ime} ${dragan.prezime}`);
logAction(
  `Kreiran je pacijent:  ${dragan.ime} ${dragan.prezime}, jmbg: ${dragan.jmbg}, broj kartona: ${dragan.brojKartona}.`
);

const datum1 = "08.03.2023 09:00";
const datum2 = "09.03.2023 15:00";
const poslednjiObrok = "07:00";

const krvniPritisak = new KrvniPritisak(
  datum1,
  "Krvni pritisak",
  0,
  140,
  90,
  85
);
const nivoSeceraUKrvi = new NivoSeceraUKrvi(
  datum2,
  "Nivo secera u krvi",
  7,
  poslednjiObrok
);

dragan.izaberiDoktora(dragan, milan);

milan.zakaziPregled(dragan, nivoSeceraUKrvi, nivoSeceraUKrvi.datum);
dragan.obaviPregled(nivoSeceraUKrvi.tip, nivoSeceraUKrvi.rezultat);

milan.zakaziPregled(dragan, krvniPritisak, datum2);
dragan.obaviPregled(krvniPritisak.tip, krvniPritisak.rezultat);
