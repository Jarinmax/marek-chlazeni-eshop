# Úpravy obsahu webu – současný stav a návrh administrace

## Teď (funguje hned, zdarma)

Všechen měnitelný obsah je na **jednom místě: `js/config.js`**:
kontakty, otevírací doba, adresa a rozměry vrat, ceník, fotogalerie, reference,
odesílání formulářů a přepínač pracovní / ostré verze.

Úprava bez programování:
1. Na GitHubu otevřít `js/config.js` → ikona tužky (Edit).
2. Přepsat hodnotu (např. `cena: null` → `cena: '1 200 Kč / hod'`).
3. Dole kliknout **Commit changes** – web se do pár minut aktualizuje.

Fotky do galerie: nahrát do složky `img/galerie/` (Add file → Upload files)
a v `config.js` do `galerie: [ … ]` přidat řádek
`{ soubor: 'img/galerie/nazev.jpg', popis: 'Popis', kategorie: 'vozy' }`.
Doporučení: fotky zmenšit na šířku cca 1600 px (rychlé načítání).

## Návrh jednoduché administrace (samostatná etapa)

| Varianta | Jak funguje | Práce | Provoz |
|---|---|---|---|
| **A – Decap CMS** (doporučeno) | stránka `/admin` s formuláři: ceník, galerie (nahrání fotek), reference, kontakty. Ukládá přímo do repozitáře. | cca 6–12 h (obsah se přesune z `config.js` do datového souboru JSON + nastavení přihlášení) | zdarma; vyžaduje hosting s přihlášením (např. Netlify) |
| B – Google tabulka | ceník a reference v tabulce Google, web si je načítá | cca 4–6 h | zdarma; fotky se spravují hůř |
| C – jen GitHub editor | jako teď (viz výše) | 0 h | zdarma |

Doporučení: **teď varianta C**, později **A** – nejlépe spolu s funkcí
„Stav opravy“ (`navrh-stav-opravy.md`), protože obě potřebují stejný hosting
a přihlášení.
