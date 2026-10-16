// Katalog produktů.
//   kategorie: id z CONFIG.obchod.kategorie
//   cena:      Kč (číslo), nebo null = „Cena na poptávku“
//   skladem:   true / false, nebo null = dostupnost se neukazuje
//   ukazka:    true = položka jen ukazuje rozložení obchodu. Nemá cenu ani dostupnost,
//              nese štítek „Ukázka“ a před spuštěním se nahradí skutečným sortimentem.
window.PRODUKTY = [
  {
    id: 'ukazka-dil-1',
    kategorie: 'dily',
    nazev: 'Díl k chladicímu agregátu',
    popis: 'Ukázková položka – sem přijde skutečný díl z Markova sortimentu.',
    cena: null,
    skladem: null,
    ukazka: true,
  },
  {
    id: 'ukazka-dil-2',
    kategorie: 'dily',
    nazev: 'Díl k chladicímu agregátu',
    popis: 'Ukázková položka – sem přijde skutečný díl z Markova sortimentu.',
    cena: null,
    skladem: null,
    ukazka: true,
  },
  {
    id: 'ukazka-dil-3',
    kategorie: 'dily',
    nazev: 'Díl k izolované nástavbě',
    popis: 'Ukázková položka – sem přijde skutečný díl z Markova sortimentu.',
    cena: null,
    skladem: null,
    ukazka: true,
  },
  {
    id: 'ukazka-agregat',
    kategorie: 'zarizeni',
    nazev: 'Chladicí agregát',
    popis: 'Ukázková položka – sem přijde skutečný agregát z Markovy nabídky.',
    cena: null,
    skladem: null,
    ukazka: true,
  },
];
