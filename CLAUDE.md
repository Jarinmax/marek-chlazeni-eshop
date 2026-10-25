# CO₂ Klima – web servisu chladírenských vozů, klimatizace a elektro (Marek)

Samostatný projekt pro Marka – CO₂ Klima.
**Nemá nic společného s Beginou ani s repozitářem `mojebegina`.** Nic z Beginy sem
nepřenášet (texty, kód, data, platby, účty) a nic odsud nepřenášet tam.
Výjimka jen jako údaj od Marka: adresa dílny uvádí orientační bod „vedle Zahradního
bistra Begina“ – je to čistě text v adrese, žádné odkazy ani propojení.

## Zaměření (Markův e-mail „Web co2klima“)

- **Chladírenské vozy** – servis chladicích jednotek, diagnostika závad, opravy, údržba.
  Hlavní důraz na úvodní stránce.
- **Klimatizace** – montáž, servis, opravy, údržba.
- **Elektro** – elektroinstalační práce, diagnostika a odstraňování závad.
- **Tepelná čerpadla na web NEpatří.**
- Dílna: vrata šířka 3,58 m, výška 3,90 m (sekce „Vejde se vaše vozidlo do naší dílny?“).
- Používat jen potvrzené údaje. Nevymýšlet ceny, reference, technické parametry ani firemní údaje.

## Technologie

Čistě statický web: HTML + CSS + vanilla JS, bez buildu a serveru. Písmo Lexend je
uložené v `fonts/` (žádné Google Fonts).

- `js/config.js` – **veškerý měnitelný obsah na jednom místě**: firma, kontakty, dílna,
  ceník, galerie, reference, formuláře, analytika, pracovní/ostrá verze.
  `null` = nepotvrzeno → v pracovní verzi žluté „[popisek]“, v ostré se skryje / „na dotaz“.
- `js/app.js` – hlavička, patička, vyplnění obsahu, galerie, validace a odesílání formulářů,
  lišta cookies (jen když `analytika` není null), parkovaný obchod.
- Stránky: `index`, `chladirenske-vozy`, `klimatizace`, `elektro`, `cenik`, `reference`
  (galerie + reference), `stav-opravy` (jen „Připravujeme“), `kontakt` (+ formulář),
  `servis` (Nezávazně poptat servis), `zasady-ochrany-osobnich-udaju`, `404`.
- Parkovaný obchod `obchod` / `poptavka` / `kosik` – není v menu, `produkty.js` ukázkový.
- **Kontaktní údaje jsou kvůli SEO i staticky v HTML** (JSON-LD v `index.html` a `kontakt.html`,
  výchozí texty tlačítek/adres). Při změně kontaktů upravit `config.js` i tyto výskyty
  (`grep -rn "734 112 681\|Vitice 119" *.html`).

## Úvodní stránka (Markův grafický návrh)

- Úvod přes celou šířku: nadtitul, nadpis „Servis chladírenských vozů, klimatizací a elektroinstalací“,
  tlačítka Zavolat / Nezávazně poptat servis; vpravo karta „Vejde se vaše vozidlo do naší dílny?“
  (nákres `img/vrata.svg` + kóty + zelené dlaždice MAX. ŠÍŘKA / VÝŠKA + „Nejste si jistí? Zavolejte nám“).
- Pod úvodem pruh služeb s ikonami + dlaždice z `CONFIG.vyhody` (`potvrzeno: false` = jen v pracovní
  verzi se štítkem „k potvrzení“; text „dlouholeté zkušenosti“ čeká na Markovo potvrzení).
- Fotka v pozadí úvodu: `CONFIG.uvod.fotoPozadi` (jen skutečná fotka – ne vygenerovaná / s cizími značkami).
- Hlavička: znak `img/znak.webp` + text „CO2klima“ + podtitul (skrývá se pod 1320 px).

## Formuláře

- Jediná funkce `odesliPozadavek`. `CONFIG.formular.endpoint: null` = NENÍ napojeno:
  formulář se zkontroluje, ale nic se neodešle a zobrazí se „Zpráva nebyla odeslána“
  + telefon a předvyplněný e-mail. Nikdy nezobrazovat „odesláno“ bez skutečného odeslání.
- Napojení: endpoint přijímající POST `multipart/form-data`, fotky v poli `fotky`.
  Úspěch jen při HTTP 2xx a odpovědi bez `success: false`.
- Validace v JS s českými hláškami: povinná pole, telefon, e-mail, max. 5 fotek,
  JPG/PNG/WEBP/HEIC, max. 10 MB/fotka. Pole o vozidle jen u služby „Chladírenský vůz“.
  Pole „Chladivo v okruhu“ (typ, např. R134a; nepovinné) u chladírenských vozů i klimatizací – přání Marka.

## Spuštění (před ostrým provozem)

1. Doplnit null údaje v `config.js` (obchodní jméno, DIČ, ceny, fotky, reference), originál loga.
2. Zvolit hosting a doménu → zapnout HTTPS.
3. Napojit formulář (endpoint), otestovat skutečné odeslání vč. fotek, doplnit zpracovatele do zásad.
4. `pracovniVerze: false`; `robots.txt` povolit + vytvořit `sitemap.xml` s doménou; do JSON-LD přidat `url`.
5. Google profil firmy, Search Console.

Návrhy budoucích etap: `docs/navrh-stav-opravy.md`, `docs/navrh-administrace.md`.

## Pravidla

- Do repozitáře nikdy nedávat hesla, API klíče s právem zápisu ani přístupy k platbám.
- Texty česky. Žádné nepovinné cookies / analytika bez souhlasu.

## Vzhled (Markův návrh)

Černé pozadí, limetková zelená `#6cc70a`, bílé tučné nadpisy, písmo Lexend.
Hlavní tlačítko zelené s černým textem, vedlejší černé se zeleným rámečkem.
Zelený pruh „Má váš chladírenský vůz poruchu?“ nad patičkou. Barvy v `css/styl.css` (`:root`).
`img/logo.png` / `logo.webp` jsou vystřižené ze screenshotu – nahradit originálem od Marka.
`img/vrata.svg` je kreslený nákres – lze nahradit fotkou přes `dilna.fotoVrat`.
