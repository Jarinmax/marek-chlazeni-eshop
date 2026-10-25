# Stav opravy – návrh samostatné etapy (k nacenění)

Stav: **jen návrh.** Na webu je teď stránka „Stav opravy – připravujeme“
(`stav-opravy.html`) bez databáze a bez přihlašování.

## Cíl

Zákazník si sám zjistí, v jaké fázi je oprava jeho vozu, a nemusí volat.
Marek stav mění jedním kliknutím z mobilu přímo v dílně.

## Navržený rozsah (základní verze)

**Pro Marka (administrace, přihlášení jen pro něj):**
- založit zakázku: SPZ, jméno a telefon zákazníka, krátký popis,
- měnit stav zakázky, například:
  Přijato → Diagnostika → Čeká na díly → Opravuje se → Hotovo k vyzvednutí → Předáno,
- poznámka pro zákazníka a předpokládaný termín,
- ovládání přizpůsobené mobilu.

**Pro zákazníka (bez registrace):**
- na stránce „Stav opravy“ zadá **kód zakázky + SPZ**, nebo otevře osobní odkaz,
  který dostane od Marka (SMS / e-mail),
- uvidí stav, poznámku a termín – nic dalšího (žádné osobní údaje).

**Rozšíření (volitelně, nacenit zvlášť):**
- automatická SMS nebo e-mail při změně stavu,
- fotky z opravy viditelné zákazníkovi,
- historie zakázek vozu.

## Potřebné části systému

| Část | K čemu | Příklad řešení |
|---|---|---|
| Databáze | zakázky a jejich stavy | spravovaná databáze s bezplatným tarifem (např. Supabase, Firebase) |
| Serverová část | bezpečné čtení a změny stavu | serverless funkce (Netlify / Vercel / Cloudflare) |
| Přihlášení | jen Marek smí měnit stavy | přihlášení e-mailem / heslem nebo přes Google |
| Administrace | formulář a seznam zakázek | jednoduchá stránka `/admin` v designu webu |
| Veřejná stránka | dotaz zákazníka | současná `stav-opravy.html` + formulář kód + SPZ |
| Zabezpečení | ochrana údajů | náhodné kódy zakázek, omezení počtu pokusů, HTTPS |
| GDPR | doba uchování | automatické smazání údajů po předání vozu (např. po X měsících) |

**Hosting:** GitHub Pages umí jen statické stránky. Pro tuto funkci by se web
přesunul na hosting se serverless funkcemi (Netlify, Vercel nebo Cloudflare Pages –
všechny mají bezplatný tarif). Vzhled a stávající stránky zůstanou stejné.

## Odhad složitosti a ceny (orientační)

| Varianta | Práce | Poznámka |
|---|---|---|
| Základní verze (výše) | cca 25–40 hodin | databáze, přihlášení, administrace, veřejný dotaz, testy |
| + SMS / e-mail při změně stavu | + 8–15 hodin | SMS brána se platí za zprávu (řádově korun za SMS) |
| + fotky z opravy | + 6–10 hodin | úložiště fotek, náhledy |

Cena = hodiny × sazba vývojáře. Například při sazbě 800–1 200 Kč/h vychází
základní verze orientačně na **20 000–48 000 Kč**. Provoz při malém počtu
zakázek se vejde do bezplatných tarifů (kromě SMS).

## Co je potřeba rozhodnout předem

1. Jaké stavy zakázky Marek reálně používá.
2. Jak zákazník dostane kód / odkaz (ústně, SMS, e-mail).
3. Zda chce automatické zprávy (SMS / e-mail).
4. Jak dlouho se mají údaje o zakázce uchovávat.

Doporučení: realizovat společně s administrací obsahu (viz `navrh-administrace.md`),
protože obojí potřebuje stejný hosting a přihlášení – ušetří se práce.
