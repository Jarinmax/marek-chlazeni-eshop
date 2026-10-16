// Společný kód: hlavička, patička, pracovní pole, katalog, košík a formuláře.
(function () {
  const C = window.CONFIG;
  const P = window.PRODUKTY || [];
  const F = C.firma;
  const KLIC_KOSIKU = 'kosik-co2klima';

  const kc = (n) => n.toLocaleString('cs-CZ') + ' Kč';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const produkt = (id) => P.find((p) => p.id === id);

  // ---------- Pracovní pole ----------
  // Nepotvrzený údaj (null v config.js) se zobrazí jako žlutě zvýrazněné „[popisek]“.
  const POPISKY = {
    nazev: 'Název firmy',
    ico: 'IČO',
    dic: 'DIČ',
    adresa: 'Adresa dílny',
    telefon: 'telefon',
    email: 'e-mail',
    oteviraciDoba: 'Otevírací doba',
    oblast: 'Oblast působnosti',
  };
  const pracovni = (popisek) => `<span class="pracovni" title="Pracovní pole – doplnit v js/config.js">[${esc(popisek)}]</span>`;
  const pole = (hodnota, popisek) => (hodnota == null || hodnota === '' ? pracovni(popisek) : esc(hodnota));
  const firma = (klic) => pole(F[klic], POPISKY[klic] || klic);
  const telOdkaz = F.telefon ? 'tel:' + F.telefon.replace(/\s+/g, '') : 'kontakt.html';
  const mailOdkaz = F.email ? 'mailto:' + F.email : 'kontakt.html';

  function pruhPracovniVerze() {
    if (!C.pracovniVerze) return;
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    const pruh = document.createElement('div');
    pruh.className = 'pruh-pracovni';
    pruh.innerHTML = `Pracovní verze webu – údaje ${pracovni('v závorkách')} a ukázkové položky se před spuštěním doplní.`;
    document.body.prepend(pruh);
  }

  // ---------- Košík (aktivní jen při CONFIG.obchod.objednavky) ----------
  function nactiKosik() {
    try {
      const k = JSON.parse(localStorage.getItem(KLIC_KOSIKU)) || {};
      // Vyhodit položky, které už v katalogu nejsou nebo se nedají koupit.
      for (const id of Object.keys(k)) if (!lzeKoupit(produkt(id))) delete k[id];
      return k;
    } catch (e) {
      return {};
    }
  }
  function ulozKosik(k) {
    try { localStorage.setItem(KLIC_KOSIKU, JSON.stringify(k)); } catch (e) { /* bez úložiště košík nepřežije reload */ }
    aktualizujPocet();
  }
  function pridej(id, ks) {
    const k = nactiKosik();
    k[id] = (k[id] || 0) + ks;
    ulozKosik(k);
  }
  function aktualizujPocet() {
    const n = Object.values(nactiKosik()).reduce((a, b) => a + b, 0);
    document.querySelectorAll('[data-pocet-kosik]').forEach((el) => {
      el.textContent = n;
      el.hidden = n === 0;
    });
  }
  const lzeKoupit = (p) => !!(C.obchod.objednavky && p && !p.ukazka && typeof p.cena === 'number');

  // ---------- Hlavička a patička ----------
  function hlavicka() {
    const el = document.getElementById('hlavicka');
    if (!el) return;
    const aktivni = document.body.dataset.stranka;
    const odkazy = [
      ['sluzby.html', 'sluzby', 'Služby'],
      ['obchod.html', 'obchod', 'Obchod'],
      ['cenik.html', 'cenik', 'Ceník'],
      ['kontakt.html', 'kontakt', 'Kontakt'],
    ];
    const aria = (id) => (id === aktivni ? ' aria-current="page"' : '');
    el.innerHTML = `
      <div class="obal hlavicka">
        <a class="logo" href="index.html"><img src="img/logo-maly.png" alt="${esc(F.znacka)} – ${esc(F.podtitul)}"></a>
        <button class="menu-tlacitko" aria-expanded="false" aria-controls="menu">Menu</button>
        <nav id="menu" class="menu">
          ${odkazy.map(([h, id, t]) => `<a href="${h}"${aria(id)}>${t}</a>`).join('')}
          ${C.obchod.objednavky ? `<a href="kosik.html"${aria('kosik')}>Košík <span class="odznak" data-pocet-kosik hidden>0</span></a>` : ''}
          <a class="tlacitko menu-cta" href="servis.html"${aria('servis')}>Poptat opravu</a>
        </nav>
      </div>`;
    const btn = el.querySelector('.menu-tlacitko');
    btn.addEventListener('click', () => {
      const otevreno = el.querySelector('.menu').classList.toggle('otevreno');
      btn.setAttribute('aria-expanded', otevreno);
    });
  }

  function paticka() {
    const el = document.getElementById('paticka');
    if (!el) return;
    el.innerHTML = `
      <div class="obal paticka">
        <div class="paticka-firma">
          <a class="logo" href="index.html"><img src="img/logo-maly.png" alt="${esc(F.znacka)}"></a>
          <p>${firma('nazev')}, IČO ${firma('ico')}<br>${firma('adresa')}</p>
        </div>
        <p><a href="${telOdkaz}">${firma('telefon')}</a><br><a href="${mailOdkaz}">${firma('email')}</a><br>${firma('oteviraciDoba')}</p>
        <nav class="paticka-menu" aria-label="Patička">
          <a href="sluzby.html">Služby</a>
          <a href="cenik.html">Ceník</a>
          <a href="reference.html">Reference</a>
          <a href="stav-opravy.html">Stav opravy</a>
          <a href="obchod.html">Obchod</a>
          <a href="kontakt.html">Kontakt</a>
        </nav>
      </div>`;
  }

  // ---------- Obsah řízený z config.js ----------
  function vyplnObsah() {
    document.querySelectorAll('[data-firma]').forEach((el) => {
      el.innerHTML = firma(el.dataset.firma);
    });
    document.querySelectorAll('[data-zavolat]').forEach((el) => {
      el.href = telOdkaz;
      el.innerHTML = 'Zavolat ' + (F.telefon ? esc(F.telefon) : '[telefon]');
    });
    document.querySelectorAll('[data-znacky]').forEach((el) => {
      el.innerHTML = C.znackyAgregatu && C.znackyAgregatu.length
        ? C.znackyAgregatu.map(esc).join(', ')
        : pracovni('značky agregátů, se kterými pracujeme');
    });
    document.querySelectorAll('[data-gastro]').forEach((el) => { el.hidden = !C.zobrazitGastro; });

    const cenik = document.getElementById('cenik');
    if (cenik) {
      cenik.innerHTML = `
        <table class="tabulka">
          <thead><tr><th>Služba</th><th>Cena</th></tr></thead>
          <tbody>${C.cenik.map((r) => `<tr><td>${esc(r.polozka)}</td><td>${r.cena == null ? pracovni('cena') : esc(r.cena)}</td></tr>`).join('')}</tbody>
        </table>`;
    }

    const ref = document.getElementById('reference');
    if (ref) {
      ref.innerHTML = C.reference.length
        ? C.reference.map((r) => `<figure class="reference"><blockquote>${esc(r.text)}</blockquote><figcaption>${esc(r.autor || '')}</figcaption></figure>`).join('')
        : `<p class="info">${pracovni('Reference doplníme – fotky oprav a hodnocení zákazníků')}</p>`;
    }
  }

  // ---------- Obchod ----------
  function karta(p) {
    const kat = C.obchod.kategorie.find((k) => k.id === p.kategorie);
    let cena;
    if (p.ukazka) cena = pracovni('cena');
    else if (typeof p.cena === 'number') cena = kc(p.cena);
    else cena = 'Cena na poptávku';
    const sklad = !p.ukazka && typeof p.skladem === 'boolean'
      ? `<span class="sklad ${p.skladem ? 'ano' : 'ne'}">${p.skladem ? 'Skladem' : 'Na objednávku'}</span>`
      : '';
    const akce = lzeKoupit(p)
      ? `<div class="koupit">
           <input type="number" min="1" value="1" aria-label="Počet kusů">
           <button class="tlacitko" data-pridat="${esc(p.id)}">Do košíku</button>
         </div>`
      : `<a class="tlacitko druhotne" href="poptavka.html${p.ukazka ? '' : '?produkt=' + encodeURIComponent(p.id)}">Poptat</a>`;
    return `
      <article class="karta">
        <div class="karta-hlava">
          <span class="kategorie">${esc(kat ? kat.nazev : '')}</span>
          ${p.ukazka ? '<span class="stitek ukazka">Ukázka</span>' : ''}
        </div>
        <h3>${esc(p.nazev)}</h3>
        <p>${esc(p.popis)}</p>
        <div class="cena-radek"><span class="cena">${cena}</span>${sklad}</div>
        ${akce}
      </article>`;
  }

  function obchod() {
    const mrizka = document.getElementById('katalog');
    if (!mrizka) return;
    const info = document.getElementById('obchod-info');
    if (info && (!C.obchod.objednavky || P.some((p) => p.ukazka))) {
      info.hidden = false;
      info.innerHTML = 'Obchod připravujeme. Položky označené <strong>Ukázka</strong> jen ukazují rozložení a nejsou skutečnou nabídkou. '
        + 'Potřebujete díl? <a href="poptavka.html">Pošlete poptávku</a> nebo <a href="' + telOdkaz + '">zavolejte</a>.';
    }
    const filtry = document.getElementById('filtry');
    const hledat = document.getElementById('hledat');
    let kategorie = new URLSearchParams(location.search).get('kategorie') || '';

    filtry.innerHTML = [{ id: '', nazev: 'Vše' }, ...C.obchod.kategorie]
      .map((k) => `<button class="filtr" data-kategorie="${k.id}">${esc(k.nazev)}</button>`).join('');

    function vykresli() {
      const q = hledat.value.trim().toLowerCase();
      const vysledek = P.filter((p) => (!kategorie || p.kategorie === kategorie) &&
        (!q || (p.nazev + ' ' + p.popis).toLowerCase().includes(q)));
      mrizka.innerHTML = vysledek.length ? vysledek.map(karta).join('') : '<p class="prazdne">Nic jsme nenašli. Zkuste jiné slovo, nebo nám pošlete <a href="poptavka.html">poptávku</a>.</p>';
      filtry.querySelectorAll('.filtr').forEach((b) => b.setAttribute('aria-pressed', b.dataset.kategorie === kategorie));
    }
    filtry.addEventListener('click', (e) => {
      const b = e.target.closest('.filtr');
      if (!b) return;
      kategorie = b.dataset.kategorie;
      vykresli();
    });
    hledat.addEventListener('input', vykresli);
    mrizka.addEventListener('click', (e) => {
      const b = e.target.closest('[data-pridat]');
      if (!b) return;
      const ks = Math.max(1, parseInt(b.previousElementSibling.value, 10) || 1);
      pridej(b.dataset.pridat, ks);
      oznam(`Přidáno do košíku (${ks} ks).`);
    });
    vykresli();
  }

  // ---------- Košík a objednávka ----------
  function kosik() {
    const el = document.getElementById('kosik');
    if (!el) return;
    const form = document.getElementById('objednavka');
    if (!C.obchod.objednavky) {
      el.innerHTML = '<p class="info">Objednávky přes e-shop zatím nejsou spuštěné. Díly a zařízení můžete <a href="poptavka.html">poptat</a>.</p>';
      form.hidden = true;
      return;
    }
    const doprava = form.querySelector('[name=doprava]');
    const platba = form.querySelector('[name=platba]');
    const cenaDopravy = (d) => (d.cena == null ? ' (cenu upřesníme)' : d.cena ? ' – ' + kc(d.cena) : ' – zdarma');
    doprava.innerHTML = C.obchod.doprava.map((d) => `<option value="${d.id}">${esc(d.nazev)}${cenaDopravy(d)}</option>`).join('');
    platba.innerHTML = C.obchod.platba.map((p) => `<option value="${p.id}">${esc(p.nazev)}</option>`).join('');

    function vykresli() {
      const polozky = Object.entries(nactiKosik()).map(([id, ks]) => ({ p: produkt(id), ks }));
      if (!polozky.length) {
        el.innerHTML = '<p class="prazdne">Košík je prázdný. <a href="obchod.html">Pokračovat do obchodu</a></p>';
        form.hidden = true;
        return;
      }
      form.hidden = false;
      const d = C.obchod.doprava.find((x) => x.id === doprava.value);
      const zbozi = polozky.reduce((s, x) => s + x.p.cena * x.ks, 0);
      const celkem = zbozi + (d && d.cena ? d.cena : 0);
      el.innerHTML = `
        <table class="tabulka">
          <thead><tr><th>Položka</th><th>Cena/ks</th><th>Počet</th><th>Celkem</th><th></th></tr></thead>
          <tbody>${polozky.map(({ p, ks }) => `
            <tr>
              <td>${esc(p.nazev)}</td>
              <td>${kc(p.cena)}</td>
              <td><input type="number" min="1" value="${ks}" data-ks="${esc(p.id)}" aria-label="Počet kusů"></td>
              <td>${kc(p.cena * ks)}</td>
              <td><button class="odebrat" data-odebrat="${esc(p.id)}" aria-label="Odebrat">✕</button></td>
            </tr>`).join('')}</tbody>
        </table>
        <p class="soucet">Zboží: ${kc(zbozi)}<br>Doprava: ${d && d.cena == null ? 'upřesníme' : kc(d ? d.cena : 0)}<br><strong>Celkem: ${kc(celkem)}</strong></p>`;
    }
    el.addEventListener('change', (e) => {
      const id = e.target.dataset.ks;
      if (!id) return;
      const k = nactiKosik();
      k[id] = Math.max(1, parseInt(e.target.value, 10) || 1);
      ulozKosik(k);
      vykresli();
    });
    el.addEventListener('click', (e) => {
      const id = e.target.dataset.odebrat;
      if (!id) return;
      const k = nactiKosik();
      delete k[id];
      ulozKosik(k);
      vykresli();
    });
    doprava.addEventListener('change', vykresli);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const radky = Object.entries(nactiKosik()).map(([id, ks]) => {
        const p = produkt(id);
        return `${ks}× ${p.nazev} à ${kc(p.cena)} = ${kc(p.cena * ks)}`;
      });
      const ok = await odesliPozadavek(form, 'objednavka', 'Objednávka z e-shopu', { polozky: radky.join('\n') });
      if (ok) {
        ulozKosik({});
        el.innerHTML = '';
        form.hidden = true;
      }
    });
    vykresli();
  }

  // ---------- Formuláře ----------
  function formulare() {
    const poptavka = document.getElementById('poptavka');
    if (poptavka) {
      const p = produkt(new URLSearchParams(location.search).get('produkt'));
      if (p && !p.ukazka) poptavka.querySelector('[name=predmet]').value = p.nazev;
      poptavka.addEventListener('submit', (e) => {
        e.preventDefault();
        odesliPozadavek(poptavka, 'poptavka', 'Poptávka z webu');
      });
    }
    const servis = document.getElementById('servis');
    if (servis) {
      // Příchod ze stránky Služby (servis.html?typ=nastavba) předvybere typ požadavku.
      const typ = new URLSearchParams(location.search).get('typ');
      const volba = typ && servis.querySelector(`option[data-typ="${CSS.escape(typ)}"]`);
      if (volba) volba.selected = true;
      servis.addEventListener('submit', (e) => {
        e.preventDefault();
        odesliPozadavek(servis, 'oprava', 'Poptávka opravy chladírenského vozu');
      });
    }
    document.querySelectorAll('input[type=file][name=fotky]').forEach(pripravFotky);
  }

  // Výběr fotek: kontrola počtu a velikosti, náhledy.
  function pripravFotky(input) {
    const nahledy = input.closest('form').querySelector('.nahledy');
    const limit = input.closest('form').querySelector('[data-limit-fotek]');
    if (limit) limit.textContent = `Nejvýše ${C.formular.maxFotek} fotek, každá do ${C.formular.maxVelikostFotkyMB} MB.`;
    input.addEventListener('change', () => {
      const soubory = Array.from(input.files);
      let chyba = '';
      if (soubory.length > C.formular.maxFotek) chyba = `Vyberte nejvýše ${C.formular.maxFotek} fotek.`;
      else if (soubory.some((f) => !f.type.startsWith('image/'))) chyba = 'Přiložit lze jen fotky (obrázky).';
      else if (soubory.some((f) => f.size > C.formular.maxVelikostFotkyMB * 1024 * 1024)) chyba = `Každá fotka může mít nejvýše ${C.formular.maxVelikostFotkyMB} MB.`;
      input.setCustomValidity(chyba);
      if (chyba) input.reportValidity();
      nahledy.querySelectorAll('img').forEach((img) => URL.revokeObjectURL(img.src));
      nahledy.innerHTML = chyba ? '' : soubory.map((f) => `<img src="${URL.createObjectURL(f)}" alt="${esc(f.name)}">`).join('');
    });
  }

  // Jediné místo, kudy formuláře odcházejí. Napojení = vyplnit CONFIG.formular.endpoint.
  // Posílá multipart/form-data: všechna pole formuláře (včetně fotek) + „typ“ a „predmet“.
  async function odesliPozadavek(form, typ, predmet, navic) {
    const stav = form.querySelector('.stav');
    stav.className = 'stav';
    const kontakt = [F.telefon && `zavolejte na ${F.telefon}`, F.email && `napište na ${F.email}`].filter(Boolean).join(' nebo ');

    if (!C.formular.endpoint) {
      stav.classList.add('upozorneni');
      stav.textContent = 'Formulář je připravený, ale v této pracovní verzi webu se zatím nikam neodesílá.'
        + (kontakt ? ` Prosím ${kontakt}.` : '');
      return false;
    }

    const data = new FormData(form);
    data.append('typ', typ);
    data.append('predmet', predmet);
    for (const [k, v] of Object.entries(navic || {})) data.append(k, v);

    const tlacitko = form.querySelector('[type=submit]');
    tlacitko.disabled = true;
    stav.textContent = 'Odesílám…';
    try {
      const r = await fetch(C.formular.endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error(r.status);
      form.reset();
      const nahledy = form.querySelector('.nahledy');
      if (nahledy) nahledy.innerHTML = '';
      stav.textContent = 'Děkujeme, odesláno. Ozveme se vám co nejdříve.';
      return true;
    } catch (err) {
      stav.classList.add('upozorneni');
      stav.textContent = 'Odeslání se nepovedlo.' + (kontakt ? ` Prosím ${kontakt}.` : ' Zkuste to prosím znovu.');
      return false;
    } finally {
      tlacitko.disabled = false;
    }
  }

  function oznam(text) {
    let el = document.getElementById('oznameni');
    if (!el) {
      el = document.createElement('div');
      el.id = 'oznameni';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.classList.add('videt');
    clearTimeout(oznam.t);
    oznam.t = setTimeout(() => el.classList.remove('videt'), 2500);
  }

  pruhPracovniVerze();
  hlavicka();
  paticka();
  vyplnObsah();
  aktualizujPocet();
  obchod();
  kosik();
  formulare();
})();
