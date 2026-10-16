// Společný kód: hlavička, patička, košík, katalog a formuláře.
(function () {
  const C = window.CONFIG;
  const P = window.PRODUKTY || [];
  const KLIC_KOSIKU = 'kosik-chlazeni';

  const kc = (n) => n.toLocaleString('cs-CZ') + ' Kč';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const produkt = (id) => P.find((p) => p.id === id);

  // ---------- Košík ----------
  function nactiKosik() {
    try {
      const k = JSON.parse(localStorage.getItem(KLIC_KOSIKU)) || {};
      // Vyhodit položky, které už v katalogu nejsou nebo nemají cenu.
      for (const id of Object.keys(k)) if (!produkt(id) || produkt(id).cena == null) delete k[id];
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

  // ---------- Hlavička a patička ----------
  function hlavicka() {
    const aktivni = document.body.dataset.stranka;
    const odkazy = [
      ['index.html', 'uvod', 'Úvod'],
      ['obchod.html', 'obchod', 'Obchod'],
      ['servis.html', 'servis', 'Objednat servis'],
      ['poptavka.html', 'poptavka', 'Poptávka'],
      ['kontakt.html', 'kontakt', 'Kontakt'],
    ];
    const el = document.getElementById('hlavicka');
    if (!el) return;
    el.innerHTML = `
      <div class="obal hlavicka">
        <a class="logo" href="index.html">
          <span class="logo-znak" aria-hidden="true">❄</span>
          <span><strong>${esc(C.firma.nazev)}</strong><small>${esc(C.firma.podtitul)}</small></span>
        </a>
        <button class="menu-tlacitko" aria-expanded="false" aria-controls="menu">Menu</button>
        <nav id="menu" class="menu">
          ${odkazy.map(([h, id, t]) => `<a href="${h}"${id === aktivni ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
          <a class="kosik-odkaz" href="kosik.html"${aktivni === 'kosik' ? ' aria-current="page"' : ''}>Košík <span class="odznak" data-pocet-kosik hidden>0</span></a>
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
    const f = C.firma;
    el.innerHTML = `
      <div class="obal paticka">
        <div><strong>${esc(f.nazev)}</strong><br>${esc(f.adresa)}<br>IČO: ${esc(f.ico)}</div>
        <div>Tel.: <a href="tel:${esc(f.telefon)}">${esc(f.telefon)}</a><br>E-mail: <a href="mailto:${esc(f.email)}">${esc(f.email)}</a></div>
        <div>Servis: ${esc(f.oblast)}</div>
      </div>`;
  }
  function vyplnFirmu() {
    document.querySelectorAll('[data-firma]').forEach((el) => {
      el.textContent = C.firma[el.dataset.firma] ?? '';
    });
  }

  // ---------- Katalog ----------
  function karta(p) {
    const kat = C.kategorie.find((k) => k.id === p.kategorie);
    const akce = p.cena == null
      ? `<a class="tlacitko druhotne" href="poptavka.html?produkt=${encodeURIComponent(p.id)}">Poptat</a>`
      : `<div class="koupit">
           <input type="number" min="1" value="1" aria-label="Počet kusů">
           <button class="tlacitko" data-pridat="${esc(p.id)}">Do košíku</button>
         </div>`;
    return `
      <article class="karta">
        ${p.ukazka ? '<span class="stitek ukazka">Ukázka</span>' : ''}
        <span class="kategorie">${esc(kat ? kat.nazev : '')}</span>
        <h3>${esc(p.nazev)}</h3>
        <p>${esc(p.popis)}</p>
        <div class="cena-radek">
          <span class="cena">${p.cena == null ? 'Cena na poptávku' : kc(p.cena)}</span>
          ${p.cena != null ? `<span class="sklad ${p.skladem ? 'ano' : 'ne'}">${p.skladem ? 'Skladem' : 'Na objednávku'}</span>` : ''}
        </div>
        ${akce}
      </article>`;
  }
  function obchod() {
    const mrizka = document.getElementById('katalog');
    if (!mrizka) return;
    const filtry = document.getElementById('filtry');
    const hledat = document.getElementById('hledat');
    let kategorie = new URLSearchParams(location.search).get('kategorie') || '';

    filtry.innerHTML = [{ id: '', nazev: 'Vše' }, ...C.kategorie]
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
    const doprava = form.querySelector('[name=doprava]');
    const platba = form.querySelector('[name=platba]');
    doprava.innerHTML = C.doprava.map((d) => `<option value="${d.id}">${esc(d.nazev)}${d.cena == null ? ' (cenu upřesníme)' : d.cena ? ' – ' + kc(d.cena) : ' – zdarma'}</option>`).join('');
    platba.innerHTML = C.platba.map((p) => `<option value="${p.id}">${esc(p.nazev)}</option>`).join('');

    function vykresli() {
      const k = nactiKosik();
      const polozky = Object.entries(k).map(([id, ks]) => ({ p: produkt(id), ks }));
      if (!polozky.length) {
        el.innerHTML = '<p class="prazdne">Košík je prázdný. <a href="obchod.html">Pokračovat do obchodu</a></p>';
        form.hidden = true;
        return;
      }
      form.hidden = false;
      const d = C.doprava.find((x) => x.id === doprava.value);
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
        <p class="soucet">Zboží: ${kc(zbozi)}<br>Doprava: ${d && d.cena == null ? 'upřesníme' : kc(d ? d.cena : 0)}<br><strong>Celkem s DPH: ${kc(celkem)}</strong></p>`;
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
      const k = nactiKosik();
      const radky = Object.entries(k).map(([id, ks]) => {
        const p = produkt(id);
        return `${ks}× ${p.nazev} à ${kc(p.cena)} = ${kc(p.cena * ks)}`;
      });
      const d = C.doprava.find((x) => x.id === doprava.value);
      const ok = await odesli(form, 'Nová objednávka z e-shopu', {
        Objednávka: radky.join('\n'),
        Doprava: d ? d.nazev : '',
        Platba: (C.platba.find((x) => x.id === platba.value) || {}).nazev || '',
      });
      if (ok) {
        ulozKosik({});
        el.innerHTML = '';
        form.hidden = true;
      }
    });
    vykresli();
  }

  // ---------- Poptávka: předvyplnit produkt ----------
  function poptavka() {
    const form = document.getElementById('poptavka');
    if (!form) return;
    const id = new URLSearchParams(location.search).get('produkt');
    const p = id && produkt(id);
    if (p) form.querySelector('[name=predmet]').value = p.nazev;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      odesli(form, 'Nová poptávka z webu');
    });
  }

  function servis() {
    const form = document.getElementById('servis');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      odesli(form, 'Objednávka servisu z webu');
    });
  }

  // ---------- Odeslání formuláře ----------
  // Pokud je nastavená formulářová služba, pošle data tam; jinak otevře e-mail s vyplněným textem.
  async function odesli(form, predmet, navic) {
    const data = Object.fromEntries(new FormData(form).entries());
    Object.assign(data, navic || {});
    const stav = form.querySelector('.stav');
    const text = Object.entries(data).filter(([k]) => k !== 'souhlas').map(([k, v]) => `${k}: ${v}`).join('\n');

    if (!C.formular.endpoint) {
      location.href = `mailto:${C.firma.email}?subject=${encodeURIComponent(predmet)}&body=${encodeURIComponent(text)}`;
      stav.textContent = 'Otevřeli jsme váš e-mailový program s vyplněnou zprávou. Stačí ji odeslat.';
      return true;
    }
    stav.textContent = 'Odesílám…';
    try {
      const r = await fetch(C.formular.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: C.formular.klic || undefined, subject: predmet, ...data }),
      });
      if (!r.ok) throw new Error(r.status);
      form.reset();
      stav.textContent = 'Děkujeme, odesláno. Ozveme se vám co nejdříve.';
      return true;
    } catch (err) {
      stav.textContent = `Odeslání se nepovedlo. Zavolejte nám prosím na ${C.firma.telefon} nebo napište na ${C.firma.email}.`;
      return false;
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

  hlavicka();
  paticka();
  vyplnFirmu();
  aktualizujPocet();
  obchod();
  kosik();
  poptavka();
  servis();
})();
