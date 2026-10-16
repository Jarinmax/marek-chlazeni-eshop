# CO2klima – e-shop a servis chladírenských vozů (Marek)

Samostatný projekt pro Marka – CO2klima, servis a opravy chladírenských vozů.
**Nemá nic společného s Beginou ani s repozitářem `mojebegina`.** Nic z Beginy sem
nepřenášet (texty, kód, data, platby, účty) a nic odsud nepřenášet tam.

## Technologie

Čistě statický web: HTML + CSS + vanilla JS, žádný build, žádný server.
Otevře se přímo `index.html` v prohlížeči nebo přes GitHub Pages.

- `js/config.js` – údaje o firmě, kontakty, doprava, platby, kam chodí objednávky.
  Hodnoty `DOPLNIT` jsou zástupné, dokud je Marek nedodá. Nevymýšlet je.
- `js/produkty.js` – katalog. Položka s `cena: null` se nedá koupit, jen poptat.
  Ukázkové položky mají `ukazka: true` a před spuštěním se nahradí skutečnými.
- `js/app.js` – společná hlavička/patička, košík (localStorage), katalog, formuláře.
- Formuláře (objednávka, servis, poptávka) odesílají na `CONFIG.formular.endpoint`
  (např. Web3Forms / Formspree). Dokud není nastavený, otevřou e-mail (`mailto:`).

## Pravidla

- Do repozitáře nikdy nedávat hesla, API klíče s právem zápisu ani přístupy k platbám.
- Texty jsou česky, ceny v Kč včetně DPH.

## Vzhled (Markův návrh CO2klima)

Černé pozadí, limetková zelená `#6cc70a`, bílé tučné nadpisy, písmo Lexend.
Hlavní tlačítko zelené s černým textem, vedlejší černé se zeleným rámečkem.
Zelený pruh „Má váš chladírenský vůz poruchu?“ nad patičkou. Barvy jsou v `css/styl.css` (`:root`).
`img/logo.png` je zatím vystřižené ze screenshotu – nahradit originálem od Marka.
