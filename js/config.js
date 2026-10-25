// ============================================================================
//  CO₂ Klima – OBSAH A NASTAVENÍ WEBU NA JEDNOM MÍSTĚ
// ============================================================================
//  Tady se upravují kontakty, ceník, fotogalerie i reference. HTML stránky
//  není potřeba měnit.
//
//  PRAVIDLO: null = zatím nepotvrzeno.
//   - V pracovní verzi (pracovniVerze: true) se místo údaje ukáže žluté pole „[popisek]“.
//   - V ostré verzi (pracovniVerze: false) se nepotvrzený údaj skryje nebo se
//     zobrazí neutrální text (u cen „na dotaz“).
//  Nikdy sem nedávat hesla ani tajné klíče.
// ============================================================================
window.CONFIG = {
  // true = pruh „Pracovní verze“ nahoře a stránky se neindexují (viz i robots.txt).
  // Před ostrým spuštěním přepnout na false (a upravit robots.txt).
  pracovniVerze: true,

  // ---------------------------------------------------------------- Firma
  firma: {
    znacka: 'CO₂ Klima',
    podtitul: 'Servis chlazení, klimatizací a chladírenských vozů',
    nazev: null,                  // obchodní jméno držitele IČO (zatím nepotvrzeno)
    ico: '88662250',
    dic: null,
    telefon: '+420 734 112 681',  // zobrazení
    telefonOdkaz: '+420734112681', // pro odkaz tel:
    email: 'info@co2klima.cz',
    oteviraciDoba: 'Dle telefonické domluvy',
    oblast: null,
  },

  // ---------------------------------------------------------------- Dílna
  dilna: {
    adresaRadky: ['CO₂ Klima', 'areál Zahradnictví Jandl', 'Vitice 119', '281 06 Vitice'],
    upresneni: 'Skleníkový areál vedle Zahradního bistra Begina.',
    mapa: 'https://mapy.cz/zakladni?q=Vitice%20119%2C%20281%2006%20Vitice', // jen odkaz, mapa se nevkládá (žádné cookies třetích stran)
    vrata: { sirka: '3,58 m', vyska: '3,90 m' },
    fotoVrat: null, // např. 'img/vrata.jpg' – fotka nahradí kreslený obrázek vrat
  },

  // ---------------------------------------------------------------- Úvodní stránka
  uvod: {
    // Skutečná fotka do pozadí úvodu (např. vůz u vrat dílny), např. 'img/uvod.jpg'.
    // null = tmavé pozadí ve stylu webu. Nepoužívat cizí / vygenerované fotky se značkami.
    fotoPozadi: null,
  },
  // Dlaždice za službami v pruhu pod úvodem. potvrzeno: false = text čeká na Markovo
  // potvrzení – v pracovní verzi se ukáže se štítkem „k potvrzení“, v ostré se neukáže.
  vyhody: [
    { nadpis: 'Rychlý a spolehlivý servis', text: 'Flexibilní přístup, kvalitní práce a dlouholeté zkušenosti.', potvrzeno: false },
  ],

  // ---------------------------------------------------------------- Ceník
  // Skupiny podle služeb. cena: text (např. '1 200 Kč / hod') nebo null.
  // Zatím žádné ceny nejsou potvrzené – nevymýšlet.
  cenik: [
    { skupina: 'Chladírenské vozy', polozky: [
      { polozka: 'Servis chladicí jednotky', cena: null },
      { polozka: 'Diagnostika závady', cena: null },
      { polozka: 'Opravy', cena: null },
      { polozka: 'Údržba', cena: null },
    ] },
    { skupina: 'Klimatizace', polozky: [
      { polozka: 'Montáž', cena: null },
      { polozka: 'Servis a údržba', cena: null },
      { polozka: 'Opravy', cena: null },
    ] },
    { skupina: 'Elektro', polozky: [
      { polozka: 'Elektroinstalační práce', cena: null },
      { polozka: 'Diagnostika a odstraňování závad', cena: null },
    ] },
  ],
  cenikPoznamka: null, // např. 'Ceny jsou uvedeny bez DPH.' – doplnit podle Marka

  // ---------------------------------------------------------------- Fotogalerie
  // Fotky nahrát do složky img/galerie/ a přidat sem řádek:
  //   { soubor: 'img/galerie/oprava-agregatu.jpg', popis: 'Oprava agregátu', kategorie: 'vozy' },
  // kategorie: 'vozy' | 'klimatizace' | 'elektro'
  galerie: [],

  // ---------------------------------------------------------------- Reference
  // { text: 'Rychlá oprava, vůz jel ještě ten den.', autor: 'Jméno / firma' }
  reference: [],

  // ---------------------------------------------------------------- Formuláře
  // endpoint: null = odesílání NENÍ napojené. Formulář se zkontroluje, ale nic se
  // neodešle a zákazník to jasně uvidí (nikdy falešné „odesláno“).
  // Napojení: URL, která přijímá POST multipart/form-data (formulářová služba nebo
  // vlastní funkce). Fotky jdou jako soubory v poli „fotky“.
  formular: {
    endpoint: null,
    maxFotek: 5,
    maxVelikostFotkyMB: 10,
    povoleneTypy: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
    povolenePripony: ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'],
  },

  // ---------------------------------------------------------------- Cookies a analytika
  // null = web nepoužívá žádné nepovinné cookies ani analytiku a lištu nezobrazuje.
  // Až bude analytika, vyplnit např. { nazev: 'Google Analytics', skript: 'https://…' }.
  // Skript se načte AŽ po souhlasu návštěvníka.
  analytika: null,

  // ---------------------------------------------------------------- Obchod (zaparkovaný)
  // Obchod není v menu. Stránky obchod/kosik/poptavka zůstávají připravené na později.
  obchod: {
    objednavky: false,
    doprava: [
      { id: 'osobne', nazev: 'Osobní odběr v dílně', cena: null },
    ],
    platba: [
      { id: 'prevod', nazev: 'Bankovním převodem' },
    ],
    kategorie: [
      { id: 'dily', nazev: 'Náhradní díly' },
      { id: 'zarizeni', nazev: 'Zařízení' },
    ],
  },
};
