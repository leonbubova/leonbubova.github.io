(() => {
	const D = window.LEON, P = D.projects;

	/* sliding hero navigation (original behaviour) */
	const nav = document.getElementById('navigation');
	const moveNav = () => nav.classList.toggle('moved-navigation', scrollY > 1 && innerWidth >= 1160);
	addEventListener('scroll', moveNav, { passive: true }); addEventListener('resize', moveNav); moveNav();
	const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
	const $ = s => document.querySelector(s);

	/* experience */
	$('#xp').innerHTML = D.experience.map(x =>
		`<li><span class="when">${esc(x.when)}</span><div><div class="role">${esc(x.role)} <span class="where">· ${esc(x.where)}</span></div><p class="what">${esc(x.what)}</p></div></li>`).join('');

	/* filters + list */
	let filter = 'all', cur = 0, typer = null;
	const order = ['all', 'ai', 'mobile', 'bots', 'infra', 'web', 'work', 'archive'];
	$('#filters').innerHTML = order.map(t => `<button data-t="${t}" class="${t === 'all' ? 'on' : ''}">${t === 'all' ? 'all' : esc(D.tags[t])}</button>`).join('');
	$('#plist').innerHTML = P.map((p, i) =>
		`<li data-i="${i}"><button type="button"><span class="n">${String(i + 1).padStart(2, '0')}</span><span><span class="t">${esc(p.title)}</span><span class="tg">${esc(p.tags.map(t => D.tags[t]).join(' · '))}</span></span><span class="y">${esc(p.year.split(' ')[0])}</span></button></li>`).join('');

	const visible = () => [...document.querySelectorAll('#plist li')].filter(li => !li.classList.contains('hide')).map(li => +li.dataset.i);
	function applyFilter(t) {
		filter = t;
		document.querySelectorAll('#filters button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
		document.querySelectorAll('#plist li').forEach(li => li.classList.toggle('hide', t !== 'all' && !P[li.dataset.i].tags.includes(t)));
		const v = visible(); if (!v.includes(cur)) show(v[0], true);
	}
	$('#filters').addEventListener('click', e => { const b = e.target.closest('button'); if (b) applyFilter(b.dataset.t); });
	$('#plist').addEventListener('click', e => { const li = e.target.closest('li'); if (li) show(+li.dataset.i, true); });

	const DT = window.LEON_DETAIL;

	/* detail */
	function show(i, push) {
		cur = i; const p = P[i];
		document.querySelectorAll('#plist li').forEach(li => li.classList.toggle('on', +li.dataset.i === i));
		const v = visible(), pos = v.indexOf(i), prev = v[(pos - 1 + v.length) % v.length], next = v[(pos + 1) % v.length];
				$('#pdetail').innerHTML = `
			<div class="head"><h4>${esc(p.title)}</h4><span class="meta">${esc(p.year)} · <b>${esc(p.status)}</b></span></div>
			${DT.body(p)}
			<div class="pn"><button type="button" data-go="${prev}">← ${esc(P[prev].title)}</button><button type="button" data-go="${next}">${esc(P[next].title)} →</button></div>`;
		DT.wire($('#pdetail'), p);
		$('#pdetail .pn').addEventListener('click', e => { const b = e.target.closest('[data-go]'); if (b) show(+b.dataset.go, true); });
		if (push) { history.replaceState(null, '', '#p/' + p.id); if (innerWidth < 760) $('#pdetail').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
		if (push) { const li = document.querySelector(`#plist li[data-i="${i}"]`); li && li.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
	}
	document.addEventListener('keydown', e => {
		if (e.target.tagName === 'INPUT' || e.metaKey || e.ctrlKey) return;
		const v = visible(), pos = v.indexOf(cur);
		if (e.key === 'j' || e.key === 'ArrowDown') { if (!inView()) return; e.preventDefault(); show(v[(pos + 1) % v.length], true); }
		if (e.key === 'k' || e.key === 'ArrowUp') { if (!inView()) return; e.preventDefault(); show(v[(pos - 1 + v.length) % v.length], true); }
		if (e.key === 'Enter' && inView()) { const a = $('#pdetail .links a'); a && window.open(a.href, '_blank'); }
	});
	const inView = () => { const r = $('#explorer').getBoundingClientRect(); return r.top < innerHeight * .7 && r.bottom > innerHeight * .3; };

	const m = location.hash.match(/^#p\/([\w-]+)/); const start = m ? Math.max(0, P.findIndex(p => p.id === m[1])) : 0;
	show(start, false);
	if (m) setTimeout(() => $('#projects').scrollIntoView(), 50);
})();
