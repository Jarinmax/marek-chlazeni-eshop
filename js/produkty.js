// Katalog produktů.
// cena: Kč s DPH, nebo null = jen na poptávku.
// ukazka: true = vymyšlená ukázková položka, před spuštěním nahradit skutečným sortimentem.
window.PRODUKTY = [
  {
    id: 'ukazka-kompresor',
    kategorie: 'dily',
    nazev: 'Ukázka: hermetický kompresor',
    popis: 'Zástupná položka – sem přijde skutečný kompresor z Markova sortimentu.',
    cena: 9990,
    skladem: true,
    ukazka: true,
  },
  {
    id: 'ukazka-ventilator',
    kategorie: 'dily',
    nazev: 'Ukázka: ventilátor výparníku',
    popis: 'Zástupná položka – ventilátor pro chladicí box nebo vitrínu.',
    cena: 1490,
    skladem: true,
    ukazka: true,
  },
  {
    id: 'ukazka-termostat',
    kategorie: 'dily',
    nazev: 'Ukázka: elektronický termostat',
    popis: 'Zástupná položka – regulátor teploty s čidlem.',
    cena: 890,
    skladem: false,
    ukazka: true,
  },
  {
    id: 'ukazka-box',
    kategorie: 'zarizeni',
    nazev: 'Ukázka: chladicí box na míru',
    popis: 'Zástupná položka – cena podle rozměrů a výkonu, proto jen na poptávku.',
    cena: null,
    skladem: false,
    ukazka: true,
  },
  {
    id: 'ukazka-vitrina',
    kategorie: 'zarizeni',
    nazev: 'Ukázka: chladicí vitrína',
    popis: 'Zástupná položka – prodejní vitrína pro obchod nebo kavárnu.',
    cena: null,
    skladem: false,
    ukazka: true,
  },
];
