// CO₂ Klima – společný kód: hlavička, patička, obsah z config.js, galerie, formuláře, cookies.
(function () {
  const C = window.CONFIG;
  const P = window.PRODUKTY || [];
  const F = C.firma;
  const D = C.dilna;

  const kc = (n) => n.toLocaleString('cs-CZ') + ' Kč';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const produkt = (id) => P.find((p) => p.id === id);
  const uloziste = {
    cti(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    zapis(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* bez úložiště */ } },
  };

  // ---------- Pracovní pole ----------
  // Nepotvrzený údaj (null v config.js): v pracovní verzi žluté „[popisek]“,
  // v ostré verzi náhradní text (výchozí prázdný = údaj se neukáže).
  const POPISKY = { nazev: 'Obchodní jméno', ico: 'IČO', dic: 'DIČ', oblast: 'Oblast působnosti' };
  const pracovni = (popisek, nahrada = '') => (C.pracovniVerze
    ? `<span class="pracovni" title="Pracovní pole – doplnit v js/config.js">[${esc(popisek)}]</span>`
    : esc(nahrada));
  const NAHRADY = { nazev: 'provozovatel CO₂ Klima' }; // text v ostré verzi, když údaj chybí
  const hodnota = (h, popisek, nahrada) => (h == null || h === '' ? pracovni(popisek, nahrada) : esc(h));
  const firma = (klic) => hodnota(F[klic], POPISKY[klic] || klic, NAHRADY[klic]);
  const telOdkaz = 'tel:' + F.telefonOdkaz;
  const mailOdkaz = 'mailto:' + F.email;

  function pruhPracovniVerze() {
    if (!C.pracovniVerze) return;
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    const pruh = document.createElement('div');
    pruh.className = 'pruh-pracovni';
    pruh.innerHTML = `Pracovní verze webu – údaje ${pracovni('v závorkách')} se před spuštěním doplní.`;
    document.body.prepend(pruh);
  }

  // ---------- Hlavička a patička ----------
  const MENU = [
    ['chladirenske-vozy.html', 'vozy', 'Chladírenské vozy'],
    ['klimatizace.html', 'klimatizace', 'Klimatizace'],
    ['elektro.html', 'elektro', 'Elektro'],
    ['cenik.html', 'cenik', 'Ceník'],
    ['reference.html', 'reference', 'Reference'],
    ['stav-opravy.html', 'stav-opravy', 'Stav opravy'],
    ['kontakt.html', 'kontakt', 'Kontakt'],
  ];

  function hlavicka() {
    const el = document.getElementById('hlavicka');
    if (!el) return;
    const aktivni = document.body.dataset.stranka;
    const aria = (id) => (id === aktivni ? ' aria-current="page"' : '');
    el.innerHTML = `
      <div class="obal hlavicka">
        <a class="logo logo-radek" href="index.html" aria-label="${esc(F.znacka)} – úvod">
          <img src="img/znak.webp" width="160" height="154" alt="">
          <span class="logo-text" aria-hidden="true">CO<span class="dva">2</span>klima</span>
        </a>
        <span class="logo-podtitul">${esc(F.podtitul)}</span>
        <a class="hlavicka-tel" href="${telOdkaz}" aria-label="Zavolat ${esc(F.telefon)}"><svg class="ikona" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>${esc(F.telefon)}</span></a>
        <button class="menu-tlacitko" aria-expanded="false" aria-controls="menu">Menu</button>
        <nav id="menu" class="menu" aria-label="Hlavní menu">
          ${MENU.map(([h, id, t]) => `<a href="${h}"${aria(id)}>${t}</a>`).join('')}
          ${C.obchod.objednavky ? `<a href="kosik.html"${aria('kosik')}>Košík <span class="odznak" data-pocet-kosik hidden>0</span></a>` : ''}
          <a class="tlacitko menu-cta" href="servis.html"${aria('servis')}>Nezávazně poptat servis</a>
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
          <a class="logo" href="index.html"><img src="img/logo-maly.webp" width="240" height="165" alt="${esc(F.znacka)}" loading="lazy"></a>
          <p>${C.pracovniVerze || F.nazev ? firma('nazev') + ', ' : ''}IČO ${firma('ico')}</p>
          <p>${D.adresaRadky.map(esc).join('<br>')}<br><span class="tlumene">${esc(D.upresneni)}</span></p>
        </div>
        <div>
          <p><a href="${telOdkaz}">${esc(F.telefon)}</a><br><a href="${mailOdkaz}">${esc(F.email)}</a></p>
          <p>Otevírací doba: ${hodnota(F.oteviraciDoba, 'Otevírací doba')}</p>
          <p><a href="${esc(D.mapa)}" target="_blank" rel="noopener">Otevřít v mapě ↗</a></p>
        </div>
        <nav class="paticka-menu" aria-label="Patička">
          ${MENU.map(([h, , t]) => `<a href="${h}">${t}</a>`).join('')}
          <a href="servis.html">Nezávazně poptat servis</a>
        </nav>
        <div class="paticka-pravni">
          <span>© ${new Date().getFullYear()} ${esc(F.znacka)}</span>
          <a href="zasady-ochrany-osobnich-udaju.html">Ochrana osobních údajů a cookies</a>
          ${C.analytika ? '<button type="button" class="odkaz" data-cookies-nastaveni>Nastavení cookies</button>' : ''}
        </div>
      </div>`;
  }

  // ---------- Obsah řízený z config.js ----------
  function vyplnObsah() {
    // Poznámky jen pro pracovní verzi (v ostré verzi zmizí).
    document.querySelectorAll('[data-jen-pracovni]').forEach((el) => { el.hidden = !C.pracovniVerze; });
    document.querySelectorAll('[data-firma]').forEach((el) => { el.innerHTML = firma(el.dataset.firma); });
    document.querySelectorAll('[data-zavolat]').forEach((el) => {
      el.href = telOdkaz;
      // data-zavolat="kratce" = tlačítko s ikonou, text se nemění (číslo jen pro čtečky)
      if (el.dataset.zavolat === 'kratce') el.setAttribute('aria-label', 'Zavolat ' + F.telefon);
      else el.textContent = 'Zavolat ' + F.telefon;
    });
    const hero = document.querySelector('[data-uvod-hero]');
    if (hero && C.uvod && C.uvod.fotoPozadi) {
      hero.classList.add('s-fotkou');
      hero.style.backgroundImage = `linear-gradient(90deg, rgba(0,0,0,.94) 0%, rgba(0,0,0,.72) 50%, rgba(0,0,0,.35) 100%), url("${encodeURI(C.uvod.fotoPozadi)}")`;
    }
    document.querySelectorAll('[data-vyhody]').forEach((el) => {
      const ikona = '<svg class="ikona-velka" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>';
      el.outerHTML = (C.vyhody || []).filter((v) => v.potvrzeno || C.pracovniVerze).map((v) => `
        <div class="pruh-polozka${v.potvrzeno ? '' : ' k-potvrzeni'}">${ikona}
          <div><h3>${esc(v.nadpis)}</h3><p>${esc(v.text)}</p>${v.potvrzeno ? '' : '<span class="stitek-potvrzeni">k potvrzení</span>'}</div>
        </div>`).join('');
    });
    document.querySelectorAll('[data-telefon]').forEach((el) => { el.innerHTML = `<a href="${telOdkaz}">${esc(F.telefon)}</a>`; });
    document.querySelectorAll('[data-email]').forEach((el) => { el.innerHTML = `<a href="${mailOdkaz}">${esc(F.email)}</a>`; });
    document.querySelectorAll('[data-oteviraci-doba]').forEach((el) => { el.innerHTML = hodnota(F.oteviraciDoba, 'Otevírací doba'); });
    document.querySelectorAll('[data-adresa]').forEach((el) => { el.innerHTML = D.adresaRadky.map(esc).join('<br>'); });
    document.querySelectorAll('[data-upresneni]').forEach((el) => { el.textContent = D.upresneni; });
    document.querySelectorAll('[data-mapa]').forEach((el) => { el.href = D.mapa; });
    document.querySelectorAll('[data-vrata-sirka]').forEach((el) => { el.textContent = D.vrata.sirka; });
    document.querySelectorAll('[data-vrata-vyska]').forEach((el) => { el.textContent = D.vrata.vyska; });
    if (D.fotoVrat) document.querySelectorAll('[data-vrata-obrazek]').forEach((img) => { img.src = D.fotoVrat; });

    const cenik = document.getElementById('cenik');
    if (cenik) {
      cenik.innerHTML = C.cenik.map((sk) => `
        <section class="cenik-skupina">
          <h2>${esc(sk.skupina)}</h2>
          <table class="tabulka">
            <thead><tr><th scope="col">Služba</th><th scope="col">Cena</th></tr></thead>
            <tbody>${sk.polozky.map((r) => `<tr><td>${esc(r.polozka)}</td><td>${hodnota(r.cena, 'cena', 'na dotaz')}</td></tr>`).join('')}</tbody>
          </table>
        </section>`).join('')
        + (C.cenikPoznamka ? `<p class="tlumene">${esc(C.cenikPoznamka)}</p>` : '');
    }

    const ref = document.getElementById('reference');
    if (ref) {
      ref.innerHTML = C.reference.length
        ? C.reference.map((r) => `<figure class="reference"><blockquote>${esc(r.text)}</blockquote><figcaption>${esc(r.autor || '')}</figcaption></figure>`).join('')
        : `<p class="info">${pracovni('Reference zákazníků doplníme', 'Reference připravujeme.')}</p>`;
    }
    galerie();
  }

  // ---------- Fotogalerie ----------
  const KATEGORIE_GALERIE = { vozy: 'Chladírenské vozy', klimatizace: 'Klimatizace', elektro: 'Elektro' };
  function galerie() {
    const el = document.getElementById('galerie');
    if (!el) return;
    const fotky = C.galerie;
    if (!fotky.length) {
      el.innerHTML = `<p class="info">${pracovni('Fotky realizací a oprav doplníme – nahrát do img/galerie/ a zapsat v config.js', 'Fotky realizací připravujeme.')}</p>`;
      return;
    }
    const kategorie = Object.keys(KATEGORIE_GALERIE).filter((k) => fotky.some((f) => f.kategorie === k));
    let vybrana = '';
    el.innerHTML = `
      ${kategorie.length > 1 ? `<div class="filtry">${[['', 'Vše'], ...kategorie.map((k) => [k, KATEGORIE_GALERIE[k]])]
        .map(([k, t]) => `<button type="button" class="filtr" data-kategorie="${k}">${t}</button>`).join('')}</div>` : ''}
      <div class="galerie-mrizka"></div>
      <dialog class="lightbox" aria-label="Zvětšená fotka">
        <button type="button" class="lightbox-zavrit" aria-label="Zavřít">✕</button>
        <img alt=""><p></p>
      </dialog>`;
    const mrizka = el.querySelector('.galerie-mrizka');
    const dialog = el.querySelector('dialog');
    function vykresli() {
      mrizka.innerHTML = fotky.map((f, i) => ({ f, i })).filter(({ f }) => !vybrana || f.kategorie === vybrana)
        .map(({ f, i }) => `<button type="button" class="galerie-polozka" data-i="${i}">
            <img src="${esc(f.soubor)}" alt="${esc(f.popis || '')}" loading="lazy" decoding="async">
            ${f.popis ? `<span>${esc(f.popis)}</span>` : ''}
          </button>`).join('');
      el.querySelectorAll('.filtr').forEach((b) => b.setAttribute('aria-pressed', b.dataset.kategorie === vybrana));
    }
    el.addEventListener('click', (e) => {
      const filtr = e.target.closest('.filtr');
      if (filtr) { vybrana = filtr.dataset.kategorie; vykresli(); return; }
      const pol = e.target.closest('.galerie-polozka');
      if (pol && dialog.showModal) {
        const f = fotky[+pol.dataset.i];
        dialog.querySelector('img').src = f.soubor;
        dialog.querySelector('img').alt = f.popis || '';
        dialog.querySelector('p').textContent = f.popis || '';
        dialog.showModal();
      }
      if (e.target.closest('.lightbox-zavrit') || e.target === dialog) dialog.close();
    });
    vykresli();
  }

  // ---------- Formuláře ----------
  const TEL_VZOR = /^\+?[0-9][0-9 ]{7,15}$/;
  const EMAIL_VZOR = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function formulare() {
    document.querySelectorAll('form[data-formular]').forEach((form) => {
      form.noValidate = true; // vlastní kontrola s českými hláškami (bez JS zůstává kontrola prohlížeče)
      stavNapojeni(form);
      skupinyPoli(form);
      form.querySelectorAll('input[type=file][name=fotky]').forEach((input) => pripravFotky(form, input));
      form.addEventListener('input', (e) => { if (e.target.getAttribute('aria-invalid') === 'true') zkontrolujPole(e.target); });
      form.addEventListener('change', (e) => { if (e.target.getAttribute('aria-invalid') === 'true') zkontrolujPole(e.target); });
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!zkontrolujFormular(form)) return;
        await odesliPozadavek(form, form.dataset.formular, form.dataset.predmet || 'Zpráva z webu');
      });
    });

    // Parkovaný obchod: předvyplnění poptávky z karty produktu
    const poptavka = document.getElementById('poptavka');
    if (poptavka) {
      const p = produkt(new URLSearchParams(location.search).get('produkt'));
      if (p && !p.ukazka) poptavka.querySelector('[name=predmet]').value = p.nazev;
    }
  }

  // Viditelná informace, zda je formulář napojený na odesílání.
  function stavNapojeni(form) {
    const el = form.querySelector('[data-stav-napojeni]');
    if (!el) return;
    if (C.formular.endpoint) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = `<strong>Online odesílání formuláře připravujeme.</strong> Formulář si můžete vyplnit, ale zatím se sám neodešle –
      nejrychlejší je zavolat <a href="${telOdkaz}">${esc(F.telefon)}</a> nebo napsat na <a href="${mailOdkaz}">${esc(F.email)}</a>.`;
  }

  // Pole jen pro určitou službu (např. údaje o vozidle jen u chladírenských vozů).
  function skupinyPoli(form) {
    const select = form.querySelector('select[name=sluzba]');
    if (!select) return;
    const chtena = new URLSearchParams(location.search).get('sluzba');
    const volba = chtena && Array.from(select.options).find((o) => o.dataset.skupina === chtena);
    if (volba) volba.selected = true;
    const prepni = () => {
      const skupina = select.selectedOptions[0] && select.selectedOptions[0].dataset.skupina;
      form.querySelectorAll('[data-pro-skupinu]').forEach((blok) => {
        const viditelne = blok.dataset.proSkupinu.split(' ').includes(skupina);
        blok.hidden = !viditelne;
        blok.querySelectorAll('input, select, textarea').forEach((p) => { p.disabled = !viditelne; });
      });
    };
    select.addEventListener('change', prepni);
    prepni();
  }

  function chybaPole(pole, text) {
    const label = pole.closest('label') || pole.parentElement;
    let el = label.querySelector('.chyba');
    if (!el) {
      el = document.createElement('span');
      el.className = 'chyba';
      el.id = (pole.name || 'pole') + '-chyba-' + Math.random().toString(36).slice(2, 7);
      label.appendChild(el);
    }
    el.textContent = text || '';
    el.hidden = !text;
    pole.setAttribute('aria-invalid', text ? 'true' : 'false');
    if (text) pole.setAttribute('aria-describedby', el.id); else pole.removeAttribute('aria-describedby');
  }

  function chybaFotek(input) {
    const f = C.formular;
    const soubory = Array.from(input.files || []);
    if (soubory.length > f.maxFotek) return `Vyberte nejvýše ${f.maxFotek} fotek.`;
    for (const s of soubory) {
      const pripona = (s.name.split('.').pop() || '').toLowerCase();
      if (!f.povoleneTypy.includes(s.type) && !f.povolenePripony.includes(pripona)) return `Soubor „${s.name}“ není fotka. Povolené jsou JPG, PNG, WEBP a HEIC.`;
      if (s.size > f.maxVelikostFotkyMB * 1024 * 1024) return `Fotka „${s.name}“ je větší než ${f.maxVelikostFotkyMB} MB.`;
    }
    return '';
  }

  function zkontrolujPole(p) {
    if (p.disabled) { chybaPole(p, ''); return true; }
    const v = (p.value || '').trim();
    let chyba = '';
    if (p.type === 'file') chyba = chybaFotek(p);
    else if (p.type === 'checkbox') chyba = p.required && !p.checked ? 'Pro odeslání je potřeba souhlas.' : '';
    else if (p.required && !v) chyba = 'Vyplňte prosím toto pole.';
    else if (v && p.type === 'email' && !EMAIL_VZOR.test(v)) chyba = 'Zadejte e-mail ve tvaru jmeno@domena.cz.';
    else if (v && p.type === 'tel' && !TEL_VZOR.test(v)) chyba = 'Zadejte telefon, např. +420 777 123 456.';
    else if (v && p.maxLength > 0 && v.length > p.maxLength) chyba = `Text je příliš dlouhý (nejvýše ${p.maxLength} znaků).`;
    chybaPole(p, chyba);
    return !chyba;
  }

  function zkontrolujFormular(form) {
    let prvni = null;
    form.querySelectorAll('input, select, textarea').forEach((p) => {
      if (!p.name) return;
      if (!zkontrolujPole(p) && !prvni) prvni = p;
    });
    const souhrn = form.querySelector('.souhrn-chyb');
    if (souhrn) {
      souhrn.hidden = !prvni;
      souhrn.textContent = prvni ? 'Formulář obsahuje chyby – zkontrolujte prosím zvýrazněná pole.' : '';
    }
    if (prvni) {
      prvni.scrollIntoView({ block: 'center' });
      prvni.focus({ preventScroll: true });
    }
    return !prvni;
  }

  function pripravFotky(form, input) {
    const nahledy = form.querySelector('.nahledy');
    const limit = form.querySelector('[data-limit-fotek]');
    if (limit) limit.textContent = `Nejvýše ${C.formular.maxFotek} fotek (JPG, PNG, WEBP, HEIC), každá do ${C.formular.maxVelikostFotkyMB} MB.`;
    input.addEventListener('change', () => {
      const ok = zkontrolujPole(input);
      nahledy.querySelectorAll('img').forEach((img) => URL.revokeObjectURL(img.src));
      nahledy.innerHTML = ok ? Array.from(input.files).map((f) => (f.type.startsWith('image/') && !/hei[cf]/.test(f.type)
        ? `<img src="${URL.createObjectURL(f)}" alt="${esc(f.name)}">`
        : `<span class="nahled-soubor">${esc(f.name)}</span>`)).join('') : '';
    });
  }

  // Text zprávy (pro e-mail, když odesílání není napojené).
  function textZpravy(form) {
    const radky = [];
    form.querySelectorAll('input, select, textarea').forEach((p) => {
      if (!p.name || p.disabled || p.type === 'file' || p.type === 'checkbox' || !p.value.trim()) return;
      const label = p.closest('label');
      const nazev = label ? label.childNodes[0].textContent.trim() : p.name;
      radky.push(`${nazev}: ${p.value.trim()}`);
    });
    return radky.join('\n');
  }

  // Jediné místo, kudy formuláře odcházejí. Napojení = vyplnit CONFIG.formular.endpoint.
  // „Odesláno“ se ukáže JEN po skutečném úspěšném odeslání.
  async function odesliPozadavek(form, typ, predmet, navic) {
    const stav = form.querySelector('.stav');
    stav.className = 'stav';

    if (!C.formular.endpoint) {
      stav.classList.add('upozorneni');
      const mail = `${mailOdkaz}?subject=${encodeURIComponent(predmet)}&body=${encodeURIComponent(textZpravy(form))}`;
      stav.innerHTML = `<strong>Zpráva nebyla odeslána</strong> – online odesílání formuláře zatím není napojené.<br>
        Zavolejte prosím <a href="${telOdkaz}">${esc(F.telefon)}</a>, nebo
        <a href="${mail}">otevřete e-mail s vyplněnými údaji</a> (fotky k e-mailu přiložte ručně).`;
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
      let odpoved = null;
      try { odpoved = await r.json(); } catch (e) { /* služba nemusí vracet JSON */ }
      if (!r.ok || (odpoved && odpoved.success === false)) throw new Error('HTTP ' + r.status);
      form.reset();
      const nahledy = form.querySelector('.nahledy');
      if (nahledy) nahledy.innerHTML = '';
      stav.classList.add('uspech');
      stav.textContent = 'Děkujeme, zpráva byla odeslána. Ozveme se vám co nejdříve.';
      return true;
    } catch (err) {
      stav.classList.add('upozorneni');
      stav.innerHTML = `<strong>Zprávu se nepodařilo odeslat.</strong> Zkuste to prosím znovu, nebo zavolejte
        <a href="${telOdkaz}">${esc(F.telefon)}</a> či napište na <a href="${mailOdkaz}">${esc(F.email)}</a>.`;
      return false;
    } finally {
      tlacitko.disabled = false;
    }
  }

  // ---------- Cookies ----------
  // Bez nastavené analytiky web žádné nepovinné cookies nepoužívá a lištu neukazuje.
  const KLIC_SOUHLASU = 'co2klima-souhlas-cookies';
  function cookies() {
    if (!C.analytika) return;
    const nacti = () => {
      if (document.querySelector('script[data-analytika]')) return;
      const s = document.createElement('script');
      s.src = C.analytika.skript;
      s.async = true;
      s.dataset.analytika = '';
      document.head.appendChild(s);
    };
    const lista = () => {
      let el = document.getElementById('cookies-lista');
      if (!el) {
        el = document.createElement('div');
        el.id = 'cookies-lista';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-label', 'Souhlas s cookies');
        el.innerHTML = `<p>Rádi bychom měřili návštěvnost webu (${esc(C.analytika.nazev)}). Měření spustíme jen s vaším souhlasem.
          <a href="zasady-ochrany-osobnich-udaju.html#cookies">Více informací</a></p>
          <div class="akce"><button type="button" class="tlacitko" data-souhlas="ano">Povolit měření</button>
          <button type="button" class="tlacitko druhotne" data-souhlas="ne">Odmítnout</button></div>`;
        el.addEventListener('click', (e) => {
          const b = e.target.closest('[data-souhlas]');
          if (!b) return;
          uloziste.zapis(KLIC_SOUHLASU, b.dataset.souhlas);
          el.hidden = true;
          if (b.dataset.souhlas === 'ano') nacti(); else location.reload(); // odvolání souhlasu = bez skriptu
        });
        document.body.appendChild(el);
      }
      el.hidden = false;
    };
    const volba = uloziste.cti(KLIC_SOUHLASU);
    if (volba === 'ano') nacti(); else if (volba !== 'ne') lista();
    document.addEventListener('click', (e) => { if (e.target.closest('[data-cookies-nastaveni]')) lista(); });
  }

  // ---------- Parkovaný obchod (není v menu; zapnutí v config.js) ----------
  const KLIC_KOSIKU = 'kosik-co2klima';
  const lzeKoupit = (p) => !!(C.obchod.objednavky && p && !p.ukazka && typeof p.cena === 'number');
  function nactiKosik() {
    try {
      const k = JSON.parse(uloziste.cti(KLIC_KOSIKU)) || {};
      for (const id of Object.keys(k)) if (!lzeKoupit(produkt(id))) delete k[id];
      return k;
    } catch (e) { return {}; }
  }
  function ulozKosik(k) {
    uloziste.zapis(KLIC_KOSIKU, JSON.stringify(k));
    const n = Object.values(k).reduce((a, b) => a + b, 0);
    document.querySelectorAll('[data-pocet-kosik]').forEach((el) => { el.textContent = n; el.hidden = n === 0; });
  }
  function obchod() {
    const mrizka = document.getElementById('katalog');
    if (!mrizka) return;
    const info = document.getElementById('obchod-info');
    if (info) {
      info.hidden = false;
      info.innerHTML = 'Obchod připravujeme. Položky označené <strong>Ukázka</strong> nejsou skutečnou nabídkou. '
        + `Potřebujete díl? <a href="poptavka.html">Pošlete poptávku</a> nebo <a href="${telOdkaz}">zavolejte</a>.`;
    }
    const filtry = document.getElementById('filtry');
    const hledat = document.getElementById('hledat');
    let kategorie = '';
    filtry.innerHTML = [{ id: '', nazev: 'Vše' }, ...C.obchod.kategorie]
      .map((k) => `<button type="button" class="filtr" data-kategorie="${k.id}">${esc(k.nazev)}</button>`).join('');
    function karta(p) {
      const kat = C.obchod.kategorie.find((k) => k.id === p.kategorie);
      const cena = p.ukazka ? pracovni('cena', 'Cena na dotaz') : typeof p.cena === 'number' ? kc(p.cena) : 'Cena na dotaz';
      const akce = lzeKoupit(p)
        ? `<div class="koupit"><input type="number" min="1" value="1" aria-label="Počet kusů"><button class="tlacitko" data-pridat="${esc(p.id)}">Do košíku</button></div>`
        : `<a class="tlacitko druhotne" href="poptavka.html${p.ukazka ? '' : '?produkt=' + encodeURIComponent(p.id)}">Poptat</a>`;
      return `<article class="karta">
          <div class="karta-hlava"><span class="kategorie">${esc(kat ? kat.nazev : '')}</span>${p.ukazka ? '<span class="stitek ukazka">Ukázka</span>' : ''}</div>
          <h3>${esc(p.nazev)}</h3><p>${esc(p.popis)}</p>
          <div class="cena-radek"><span class="cena">${cena}</span></div>${akce}</article>`;
    }
    function vykresli() {
      const q = hledat.value.trim().toLowerCase();
      const v = P.filter((p) => (!kategorie || p.kategorie === kategorie) && (!q || (p.nazev + ' ' + p.popis).toLowerCase().includes(q)));
      mrizka.innerHTML = v.length ? v.map(karta).join('') : '<p class="prazdne">Nic jsme nenašli.</p>';
      filtry.querySelectorAll('.filtr').forEach((b) => b.setAttribute('aria-pressed', b.dataset.kategorie === kategorie));
    }
    filtry.addEventListener('click', (e) => { const b = e.target.closest('.filtr'); if (b) { kategorie = b.dataset.kategorie; vykresli(); } });
    hledat.addEventListener('input', vykresli);
    mrizka.addEventListener('click', (e) => {
      const b = e.target.closest('[data-pridat]');
      if (!b) return;
      const k = nactiKosik();
      k[b.dataset.pridat] = (k[b.dataset.pridat] || 0) + Math.max(1, parseInt(b.previousElementSibling.value, 10) || 1);
      ulozKosik(k);
    });
    vykresli();
  }
  function kosik() {
    const el = document.getElementById('kosik');
    if (!el) return;
    const form = document.getElementById('objednavka');
    if (!C.obchod.objednavky) {
      el.innerHTML = '<p class="info">Objednávky přes web zatím nejsou spuštěné. Díly můžete <a href="poptavka.html">poptat</a>.</p>';
      form.hidden = true;
      return;
    }
    const polozky = Object.entries(nactiKosik()).map(([id, ks]) => ({ p: produkt(id), ks }));
    el.innerHTML = polozky.length
      ? `<table class="tabulka"><tbody>${polozky.map(({ p, ks }) => `<tr><td>${esc(p.nazev)}</td><td>${ks} ks</td><td>${kc(p.cena * ks)}</td></tr>`).join('')}</tbody></table>`
      : '<p class="prazdne">Košík je prázdný.</p>';
    form.hidden = !polozky.length;
    form.querySelector('[name=polozky]').value = polozky.map(({ p, ks }) => `${ks}× ${p.nazev} à ${kc(p.cena)}`).join('\n');
  }

  pruhPracovniVerze();
  hlavicka();
  paticka();
  vyplnObsah();
  formulare();
  cookies();
  obchod();
  kosik();
})();
