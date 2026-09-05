/* Shared project detail renderer. Used by every site version; each version styles the classes. */
window.LEON_DETAIL = (() => {
	const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
	let typer = null;
	function demo(p) {
		const d = p.demo || {}; const bar = (label, replay) => `<div class="bar"><span>${esc(label)}</span>${replay ? '<button type="button" data-replay>↻ replay</button>' : ''}</div>`;
		if (d.type === 'term') return `<div class="demo">${bar(p.id + ' · illustrative demo', true)}<pre data-term></pre></div>`;
		if (d.type === 'chart') {
			const max = Math.max(...d.points.map(x => x[1])) || 1, w = 560, h = 150, bw = w / d.points.length;
			const bars = d.points.map(([k, v], i) => { const bh = v / max * 100; return `<rect class="bar-rect" x="${(i * bw + 6).toFixed(1)}" y="${(120 - bh).toFixed(1)}" width="${(bw - 12).toFixed(1)}" height="${bh.toFixed(1)}" opacity="${v ? 1 : .15}"><title>${esc(k)}: ${v}</title></rect><text class="bar-k" x="${(i * bw + bw / 2).toFixed(1)}" y="136" text-anchor="middle" font-size="10" font-family="JetBrains Mono">${esc(k)}</text><text class="bar-v" x="${(i * bw + bw / 2).toFixed(1)}" y="${(114 - bh).toFixed(1)}" text-anchor="middle" font-size="10" font-family="JetBrains Mono">${v || ''}</text>`; }).join('');
			return `<div class="demo">${bar(d.label)}<div class="chart"><svg viewBox="0 0 ${w} ${h}">${bars}</svg>${d.note ? `<div class="note">${esc(d.note)}</div>` : ''}</div></div>`;
		}
		if (d.type === 'card') return `<div class="demo">${bar('telegram · ' + d.title)}<div class="card"><div class="from">${esc(d.title)}</div><div class="msg">${esc(d.body)}</div><div class="btns">${d.buttons.map(b => `<span data-tap>${esc(b)}</span>`).join('')}</div><div class="after"><div class="msg">${esc(d.after)}</div></div></div></div>`;
		if (d.type === 'image' && p.image) return `<div class="demo">${bar(p.image)}<div class="img"><img src="${(window.LEON_BASE || '') + p.image}" alt="${esc(p.title)} screenshot" loading="lazy"></div></div>`;
		if (d.type === 'plain') return `<div class="demo">${bar('in numbers')}<div class="plain">${esc(d.text)}</div></div>`;
		return '';
	}
	function runTerm(pre, lines) {
		if (typer) clearTimeout(typer); pre.innerHTML = ''; let li = 0;
		const next = () => {
			if (li >= lines.length) { pre.innerHTML += '<span class="cur"></span>'; return; }
			const [pfx, txt] = lines[li++]; const ok = pfx.trim() === 'ok';
			if (!pfx || ok) { pre.innerHTML += (ok ? `<span class="ok">${esc(pfx)}${esc(txt)}</span>` : esc(txt)) + '\n'; typer = setTimeout(next, 320); return; }
			pre.innerHTML += `<span class="p">${esc(pfx)}</span>`; const s = document.createElement('span'); s.className = 'in'; pre.appendChild(s); let i = 0;
			const tick = () => { if (i < txt.length) { s.textContent += txt[i++]; typer = setTimeout(tick, 22 + Math.random() * 35); } else { pre.appendChild(document.createTextNode('\n')); typer = setTimeout(next, 260); } }; tick();
		}; next();
	}
	/* returns HTML for the body of a project (no title); call wire(el, p) after inserting */
	function body(p, opts = {}) {
		const links = Object.entries(p.links).map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" class="${/private/.test(n) ? 'priv' : ''}">${esc(n)}</a>`).join('');
		return `
			<p class="tagline">${esc(p.tagline)}</p>
			${opts.noDemo ? '' : demo(p)}
			<h5>what it is</h5><p>${esc(p.what)}</p>
			${p.how && p.how.length ? `<h5>how it works</h5><ul>${p.how.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
			${p.hard ? `<h5>the hard part</h5><p>${esc(p.hard)}</p>` : ''}
			${p.next ? `<h5>next</h5><p>${esc(p.next)}</p>` : ''}
			<h5>stack</h5><div class="stack">${esc(p.stack)}</div>
			${links ? `<div class="links">${links}</div>` : ''}`;
	}
	function wire(el, p) {
		const pre = el.querySelector('[data-term]'); if (pre) runTerm(pre, p.demo.lines);
		const rp = el.querySelector('[data-replay]'); if (rp && pre) rp.addEventListener('click', () => runTerm(pre, p.demo.lines));
		const btns = el.querySelector('.btns'); if (btns) btns.addEventListener('click', () => el.querySelector('.after').classList.add('show'));
	}
	/* plain-text version for the terminal page */
	function text(p) {
		const L = [];
		L.push(p.tagline, '');
		L.push('what it is', '  ' + p.what.replace(/(.{1,86})(\s|$)/g, '$1\n  ').trim(), '');
		if (p.how && p.how.length) { L.push('how it works'); p.how.forEach(h => L.push('  → ' + h.replace(/(.{1,84})(\s|$)/g, '$1\n    ').trim())); L.push(''); }
		if (p.hard) L.push('the hard part', '  ' + p.hard.replace(/(.{1,86})(\s|$)/g, '$1\n  ').trim(), '');
		if (p.next) L.push('next', '  ' + p.next, '');
		L.push('stack: ' + p.stack);
		Object.entries(p.links).forEach(([n, u]) => L.push('  ' + n.padEnd(22) + u));
		return L.join('\n');
	}
	return { esc, demo, runTerm, body, wire, text };
})();
