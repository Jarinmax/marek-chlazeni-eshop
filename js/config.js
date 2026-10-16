// Nastavení e-shopu CO2klima. Hodnoty „DOPLNIT“ čekají na údaje od Marka.
window.CONFIG = {
  firma: {
    znacka: 'CO2klima',
    podtitul: 'Servis a opravy chladírenských vozů',
    nazev: 'DOPLNIT – název firmy', // obchodní název podle živnosti / OR
    ico: 'DOPLNIT',
    dic: 'DOPLNIT',
    adresa: 'DOPLNIT – adresa dílny',
    telefon: '', // např. '+420 777 123 456'; prázdné = na webu „[telefon]“
    email: 'info@co2klima.cz',
    oteviraciDoba: 'DOPLNIT – otevírací doba',
    oblast: 'DOPLNIT – kde jezdíme na servis',
  },

  // Kam se posílají objednávky, opravy a poptávky.
  // endpoint: URL formulářové služby (Web3Forms, Formspree…). Prázdné = otevře se e-mail.
  formular: {
    endpoint: '',
    klic: '', // veřejný přístupový klíč formulářové služby, pokud ho služba vyžaduje
  },

  doprava: [
    { id: 'osobne', nazev: 'Osobní odběr v dílně', cena: 0 },
    { id: 'kuryr', nazev: 'Doručení kurýrem', cena: null }, // DOPLNIT cenu
    { id: 'pri-oprave', nazev: 'Namontujeme při opravě vozu', cena: 0 },
  ],

  platba: [
    { id: 'prevod', nazev: 'Bankovním převodem (zálohová faktura)' },
    { id: 'hotove', nazev: 'Hotově / kartou při převzetí' },
  ],

  kategorie: [
    { id: 'dily', nazev: 'Náhradní díly' },
    { id: 'zarizeni', nazev: 'Agregáty a nástavby' },
  ],
};
