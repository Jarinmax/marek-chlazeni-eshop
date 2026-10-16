// Nastavení e-shopu. Hodnoty „DOPLNIT“ čekají na údaje od Marka.
window.CONFIG = {
  firma: {
    nazev: 'DOPLNIT – název firmy',
    podtitul: 'Servis chladírenských systémů',
    ico: 'DOPLNIT',
    dic: 'DOPLNIT',
    adresa: 'DOPLNIT – adresa',
    telefon: 'DOPLNIT',
    email: 'DOPLNIT@example.cz',
    oblast: 'DOPLNIT – kde jezdíme na servis',
  },

  // Kam se posílají objednávky, servis a poptávky.
  // endpoint: URL formulářové služby (Web3Forms, Formspree…). Prázdné = otevře se e-mail.
  formular: {
    endpoint: '',
    klic: '', // veřejný přístupový klíč formulářové služby, pokud ho služba vyžaduje
  },

  doprava: [
    { id: 'osobne', nazev: 'Osobní odběr', cena: 0 },
    { id: 'kuryr', nazev: 'Doručení kurýrem', cena: null }, // DOPLNIT cenu
    { id: 'technik', nazev: 'Přiveze technik při servisu', cena: 0 },
  ],

  platba: [
    { id: 'prevod', nazev: 'Bankovním převodem (zálohová faktura)' },
    { id: 'hotove', nazev: 'Hotově / kartou při převzetí' },
  ],

  kategorie: [
    { id: 'dily', nazev: 'Náhradní díly' },
    { id: 'zarizeni', nazev: 'Zařízení' },
  ],
};
