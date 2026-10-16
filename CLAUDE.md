# CO2klima – e-shop a servis chladírenských vozů (Marek)

Samostatný projekt pro Marka – CO2klima, servis a opravy chladírenských vozů.
**Nemá nic společného s Beginou ani s repozitářem `mojebegina`.** Nic z Beginy sem
nepřenášet (texty, kód, data, platby, účty) a nic odsud nepřenášet tam.

## Zaměření

Hlavní téma: servis a opravy chladírenských vozů a chladicích dodávek (agregáty,
izolované nástavby, elektroinstalace). Úvod, nadpisy a výzvy k akci („Poptat opravu“,
„Zavolat“) míří sem. Chlazení pro kavárny/gastro je jen budoucí doplněk – v `sluzby.html`
připravené, skryté přes `CONFIG.zobrazitGastro: false`. Nesmí odvádět pozornost.

## Technologie

Čistě statický web: HTML + CSS + vanilla JS, žádný build, žádný server.
Otevře se přímo `index.html` v prohlížeči nebo přes GitHub Pages.

- `js/config.js` – **všechny údaje k doplnění na jednom místě**: firma, kontakty, ceník,
  reference, značky agregátů, odesílání formulářů, režim obchodu.
  `null` = nepotvrzeno → na webu žluté pracovní pole „[popisek]“. Nevymýšlet hodnoty.
  `pracovniVerze: true` = pruh nahoře + `noindex`; před spuštěním přepnout na `false`.
- `js/produkty.js` – katalog. `ukazka: true` = jen ukázka rozložení (bez ceny a dostupnosti,
  štítek „Ukázka“). `cena: null` u skutečné položky = „Cena na poptávku“.
- `js/app.js` – hlavička/patička, vyplnění pracovních polí, katalog, košík, formuláře.
- Obchod: `CONFIG.obchod.objednavky: false` = jen katalog s „Poptat“, bez košíku.
  `true` zapne košík a objednávku (kód je hotový, vzhled se nemění). Platební brána není.
- Formuláře (oprava, poptávka, objednávka) jdou přes jedinou funkci `odesliPozadavek`.
  `CONFIG.formular.endpoint: null` = nikam neodesílá a zákazník dostane výzvu zavolat/napsat.
  Napojení = vyplnit endpoint; posílá se `multipart/form-data` vč. fotek v poli `fotky`.
- `stav-opravy.html` je jen informační stránka „Připravujeme“ – bez databáze a přihlášení.

## Pravidla

- Do repozitáře nikdy nedávat hesla, API klíče s právem zápisu ani přístupy k platbám.
- Texty jsou česky, ceny v Kč včetně DPH.

## Vzhled (Markův návrh CO2klima)

Černé pozadí, limetková zelená `#6cc70a`, bílé tučné nadpisy, písmo Lexend.
Hlavní tlačítko zelené s černým textem, vedlejší černé se zeleným rámečkem.
Zelený pruh „Má váš chladírenský vůz poruchu?“ nad patičkou. Barvy jsou v `css/styl.css` (`:root`).
`img/logo.png` je zatím vystřižené ze screenshotu – nahradit originálem od Marka.
