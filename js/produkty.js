// Katalog produktů.
// cena: Kč s DPH, nebo null = jen na poptávku.
// ukazka: true = vymyšlená ukázková položka, před spuštěním nahradit skutečným sortimentem.
window.PRODUKTY = [
  {
    id: 'ukazka-filtr',
    kategorie: 'dily',
    nazev: 'Ukázka: filtrdehydrátor',
    popis: 'Zástupná položka – sem přijde skutečný díl k chladicímu agregátu.',
    cena: 690,
    skladem: true,
    ukazka: true,
  },
  {
    id: 'ukazka-ventilator',
    kategorie: 'dily',
    nazev: 'Ukázka: ventilátor kondenzátoru',
    popis: 'Zástupná položka – ventilátor pro agregát chladírenského vozu.',
    cena: 2490,
    skladem: true,
    ukazka: true,
  },
  {
    id: 'ukazka-termostat',
    kategorie: 'dily',
    nazev: 'Ukázka: ovládací panel s termostatem',
    popis: 'Zástupná položka – regulace teploty v nástavbě.',
    cena: 3290,
    skladem: false,
    ukazka: true,
  },
  {
    id: 'ukazka-agregat',
    kategorie: 'zarizeni',
    nazev: 'Ukázka: chladicí agregát pro dodávku',
    popis: 'Zástupná položka – cena podle vozu a montáže, proto jen na poptávku.',
    cena: null,
    skladem: false,
    ukazka: true,
  },
  {
    id: 'ukazka-nastavba',
    kategorie: 'zarizeni',
    nazev: 'Ukázka: izolovaná nástavba na míru',
    popis: 'Zástupná položka – výroba nebo oprava izolované nástavby.',
    cena: null,
    skladem: false,
    ukazka: true,
  },
];
