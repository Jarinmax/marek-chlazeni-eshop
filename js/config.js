// Nastavení webu CO2klima – všechny údaje, které se před spuštěním doplňují, jsou tady.
//
// PRAVIDLO: null = zatím nepotvrzeno. Web pak místo hodnoty ukáže pracovní pole
// v hranatých závorkách (např. „[telefon]“), zvýrazněné žlutě. Stačí null přepsat
// skutečnou hodnotou a pole se na celém webu doplní samo.
window.CONFIG = {
  // true = nahoře se ukáže pruh „Pracovní verze“ a vyhledávače web neindexují.
  // Před ostrým spuštěním přepnout na false.
  pracovniVerze: true,

  firma: {
    znacka: 'CO2klima',
    podtitul: 'Servis a opravy chladírenských vozů',
    nazev: null,         // obchodní název podle živnosti / obchodního rejstříku
    ico: null,
    dic: null,
    adresa: null,        // adresa dílny
    telefon: null,       // např. '+420 777 123 456'
    email: 'info@co2klima.cz', // z Markova návrhu – před spuštěním ověřit, že schránka existuje
    oteviraciDoba: null,
    oblast: null,        // kde jezdíme k vozům / odkud vozy přijímáme
  },

  // Odesílání formulářů (oprava, poptávka, objednávka).
  // endpoint: null = zatím nenapojeno. Formulář se vyplní a zkontroluje, ale nikam se
  // neodešle a zákazník uvidí výzvu, ať zavolá nebo napíše.
  // Po rozhodnutí sem stačí dát URL, která přijímá POST s multipart/form-data
  // (formulářová služba nebo vlastní funkce). Fotky se posílají jako soubory v poli „fotky“.
  formular: {
    endpoint: null,
    maxFotek: 5,
    maxVelikostFotkyMB: 10,
  },

  obchod: {
    // false = obchod je jen katalog: bez košíku, u položek je „Poptat“.
    // true = zapne košík a objednávky (vyžaduje skutečné ceny, dopravu, platby a napojený formulář).
    objednavky: false,
    // Pracovní – o dopravě a platbách rozhodne Marek. Používá se jen při objednavky: true.
    doprava: [
      { id: 'osobne', nazev: 'Osobní odběr v dílně', cena: null },
      { id: 'kuryr', nazev: 'Doručení kurýrem', cena: null },
    ],
    platba: [
      { id: 'prevod', nazev: 'Bankovním převodem' },
    ],
    kategorie: [
      { id: 'dily', nazev: 'Náhradní díly' },
      { id: 'zarizeni', nazev: 'Agregáty a nástavby' },
    ],
  },

  // Ceník služeb. cena: null = pracovní pole „[cena]“. Položky jsou pracovní, Marek je upraví.
  cenik: [
    { polozka: 'Hodinová sazba servisu', cena: null },
    { polozka: 'Diagnostika závady', cena: null },
    { polozka: 'Výjezd technika', cena: null },
  ],

  // Reference: [{ text: '…', autor: '…' }]. Prázdné = pracovní pole.
  reference: [],

  // Značky agregátů, se kterými Marek pracuje, např. ['…', '…']. null = pracovní pole.
  znackyAgregatu: null,

  // Doplňková oblast do budoucna (chlazení pro kavárny a gastro). Zatím skryto.
  zobrazitGastro: false,
};
