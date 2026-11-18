/* Site logic. You normally do NOT need to edit this file.
   All your text, videos, blogs and notes live in js/content.js */
(function () {
  const S = window.SITE || {};
  const P = S.profile || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtDate = (d) => { const x = new Date(d); return isNaN(x) ? "" : x.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); };

  // ---- Profile bindings
  $$("[data-bind]").forEach((el) => { const v = P[el.dataset.bind]; if (v) el.textContent = v; });
  $$("[data-bind-html]").forEach((el) => { const v = P[el.dataset.bindHtml]; if (v) el.innerHTML = v; });
  $$("[data-bind-src]").forEach((el) => { const v = P[el.dataset.bindSrc]; if (v) el.src = v; else el.style.display = "none"; });
  $$("[data-bind-href]").forEach((el) => { const v = (P.social || {})[el.dataset.bindHref]; if (v) el.href = v; else el.style.display = "none"; });
  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  // ---- Hide Videos / Blogs / Notes (and their menu links) until they have content
  const lists = { videos: S.videos, blogs: S.blogs, notes: S.notes };
  Object.entries(lists).forEach(([id, list]) => {
    if (list && list.length) return;
    const sec = document.getElementById(id); if (sec) sec.style.display = "none";
    $$(`a[href$="#${id}"]`).forEach((a) => (a.style.display = "none"));
  });
  const learn = $("#learn-btn");
  if (learn) {
    const first = Object.keys(lists).find((k) => lists[k] && lists[k].length);
    if (first) { learn.href = `#${first}`; learn.style.display = ""; } else learn.style.display = "none";
  }
  // keep light/dark sections alternating after hiding
  $$("main > section.section.alt").filter((s) => s.style.display !== "none")
    .forEach((s, i) => s.classList.toggle("section-dark", i % 2 === 1));

  // ---- Floating WhatsApp button (every page)
  const waNum = ((P.contact || {}).whatsapp || "").replace(/\D/g, "");
  if (waNum) {
    const a = document.createElement("a");
    a.className = "wa-float";
    a.href = `https://wa.me/${waNum}?text=${encodeURIComponent("Hello, I found your website casadique.com and would like to enquire.")}`;
    a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("aria-label", "Chat on WhatsApp");
    a.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4z"/></svg>`;
    document.body.appendChild(a);
  }

  // ---- Mobile nav
  const toggle = $(".nav-toggle"), links = $(".nav-links");
  if (toggle) {
    toggle.addEventListener("click", () => { const o = links.classList.toggle("open"); toggle.setAttribute("aria-expanded", o); });
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
  }

  // ---- Stats & credentials
  const stats = $("#stats");
  if (stats) stats.innerHTML = (P.stats || []).map((s) => `<div><div class="stat-num">${esc(s.value)}</div><div class="stat-label">${esc(s.label)}</div></div>`).join("");
  const cred = $("#credentials");
  if (cred) cred.innerHTML = (P.credentials || []).map((c) => `<li>${esc(c)}</li>`).join("");

  // ---- Services
  const sg = $("#services-grid");
  if (sg) sg.innerHTML = (S.services || []).map((s) => `
    <div class="service">
      <div class="service-icon">${esc(s.icon)}</div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.description)}</p>
      ${s.points ? `<ul>${s.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
      ${s.slug ? `<a class="read-more" href="services/${esc(s.slug)}.html">Learn more →</a>` : ""}
    </div>`).join("");

  // ---- Contact form topics = service names
  const topic = $("#topic-select");
  if (topic) topic.insertAdjacentHTML("beforeend", (S.services || []).map((s) => `<option>${esc(s.title)}</option>`).join(""));

  // ---- Filter chips helper
  function buildFilters(key, items, onChange) {
    const box = $(`[data-filter-for="${key}"]`);
    if (!box) return;
    const cats = ["All", ...new Set(items.map((i) => i.category).filter(Boolean))];
    if (cats.length <= 2) { box.style.display = "none"; return; }
    box.innerHTML = cats.map((c, i) => `<button class="chip${i === 0 ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    box.addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", box).forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      onChange(b.dataset.cat);
    });
  }

  // ---- Videos
  const ytId = (url) => {
    const m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
    return m ? m[1] : String(url).length === 11 ? url : null;
  };
  const vg = $("#video-grid");
  if (vg) {
    const videos = S.videos || [];
    const render = (cat) => {
      const list = videos.filter((v) => cat === "All" || v.category === cat);
      vg.innerHTML = list.length ? list.map((v) => {
        const id = ytId(v.url);
        if (!id) return "";
        return `<div class="video-card">
          <div class="video-frame" data-id="${id}" role="button" tabindex="0" aria-label="Play ${esc(v.title)}">
            <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy">
            <span class="play">▶</span>
          </div>
          <div class="video-body">
            ${v.category ? `<span class="tag">${esc(v.category)}</span>` : ""}
            <h3>${esc(v.title)}</h3>
            ${v.description ? `<p>${esc(v.description)}</p>` : ""}
          </div>
        </div>`;
      }).join("") : videos.length ? `<p class="empty">No videos in this category yet.</p>`
        : `<p class="empty">New videos are coming soon.${(P.social || {}).youtube ? ` Meanwhile, visit the <a href="${esc(P.social.youtube)}" target="_blank" rel="noopener">YouTube channel</a>.` : ""}</p>`;
    };
    const play = (frame) => {
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${frame.dataset.id}?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Video"></iframe>`;
    };
    vg.addEventListener("click", (e) => { const f = e.target.closest(".video-frame"); if (f && !f.querySelector("iframe")) play(f); });
    vg.addEventListener("keydown", (e) => { const f = e.target.closest(".video-frame"); if (f && e.key === "Enter") play(f); });
    buildFilters("videos", videos, render);
    render("All");
  }

  // ---- Blogs
  const blogs = [...(S.blogs || [])].sort((a, b) => new Date(b.date) - new Date(a.date));
  const bg = $("#blog-grid");
  if (bg) {
    const render = (cat) => {
      const list = blogs.filter((b) => cat === "All" || b.category === cat);
      bg.innerHTML = list.length ? list.map((b) => {
        const href = b.link ? b.link : `post.html?id=${encodeURIComponent(b.id)}`;
        const ext = b.link ? ` target="_blank" rel="noopener"` : "";
        return `<a class="blog-card" href="${esc(href)}"${ext}>
          ${b.category ? `<span class="tag" style="align-self:flex-start">${esc(b.category)}</span>` : ""}
          <h3>${esc(b.title)}</h3>
          <p>${esc(b.summary)}</p>
          <div class="blog-meta">${fmtDate(b.date)}</div>
          <span class="read-more">Read article →</span>
        </a>`;
      }).join("") : `<p class="empty">No articles in this category yet.</p>`;
    };
    buildFilters("blogs", blogs, render);
    render("All");
  }

  // ---- Single blog post page
  const post = $("#post");
  if (post) {
    const id = new URLSearchParams(location.search).get("id");
    const b = blogs.find((x) => x.id === id);
    if (b) {
      document.title = `${b.title} | ${P.name || ""}`;
      post.innerHTML = `
        ${b.category ? `<span class="tag">${esc(b.category)}</span>` : ""}
        <h1>${esc(b.title)}</h1>
        <div class="blog-meta">${fmtDate(b.date)} · ${esc(P.name || "")}</div>
        <div class="post-body">${b.body || `<p>${esc(b.summary)}</p>`}</div>`;
    } else {
      post.innerHTML = `<h1>Article not found</h1><p><a href="index.html#blogs">Back to all blogs</a></p>`;
    }
  }

  // ---- Notes
  const nl = $("#notes-list");
  if (nl) {
    const notes = S.notes || [];
    let cat = "All", q = "";
    const render = () => {
      const list = notes.filter((n) =>
        (cat === "All" || n.category === cat) &&
        (!q || `${n.title} ${n.description} ${n.category}`.toLowerCase().includes(q)));
      nl.innerHTML = list.length ? list.map((n) => {
        const type = (n.type || (String(n.url).toLowerCase().endsWith(".pdf") ? "PDF" : "LINK")).toUpperCase();
        return `<div class="note">
          <div class="note-icon">${esc(type)}</div>
          <div class="note-body">
            <h3>${esc(n.title)}</h3>
            <p>${[n.category, n.description].filter(Boolean).map(esc).join(" · ")}</p>
          </div>
          <a class="btn btn-small btn-ghost" href="${esc(n.url)}" target="_blank" rel="noopener">${type === "PDF" ? "Download" : "Open"}</a>
        </div>`;
      }).join("") : `<p class="empty">${notes.length ? "No notes match your search." : "Notes and downloads are coming soon."}</p>`;
    };
    const tb = $(".notes-toolbar");
    if (tb && notes.length < 6) tb.style.display = "none";   // search box appears once there are enough notes
    buildFilters("notes", notes, (c) => { cat = c; render(); });
    const search = $("#notes-search");
    if (search) search.addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); render(); });
    render();
  }

  // ---- Contact
  const C = P.contact || {};
  const wa = $("#whatsapp-btn");
  if (wa) { if (C.whatsapp) wa.href = `https://wa.me/${C.whatsapp.replace(/\D/g, "")}`; else wa.style.display = "none"; }
  const em = $("#email-btn");
  if (em) { if (C.email) em.href = `mailto:${C.email}`; else em.style.display = "none"; }
  const cl = $("#contact-list");
  if (cl) {
    const rows = [
      C.phone && ["📞", "Phone", `<a href="tel:${esc(C.phone.replace(/\s/g, ""))}">${esc(C.phone)}</a>`],
      C.email && ["✉️", "Email", `<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>`],
      C.address && ["📍", "Office", C.mapLink ? `<a href="${esc(C.mapLink)}" target="_blank" rel="noopener">${esc(C.address)}</a>` : esc(C.address)],
      C.hours && ["🕘", "Office hours", esc(C.hours)],
    ].filter(Boolean);
    cl.innerHTML = rows.map(([i, l, v]) => `<li><span class="ci">${i}</span><div><small>${l}</small>${v}</div></li>`).join("");
  }
  const so = $("#socials");
  if (so) {
    const icons = {
      youtube: ["YouTube", "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"],
      linkedin: ["LinkedIn", "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5z"],
      instagram: ["Instagram", "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2.2c2.7 0 3 0 4 .1 2.7.1 4 1.4 4.1 4.1.1 1 .1 1.4.1 4s0 3-.1 4c-.1 2.7-1.4 4-4.1 4.1-1 .1-1.4.1-4 .1s-3 0-4-.1c-2.7-.1-4-1.4-4.1-4.1-.1-1-.1-1.4-.1-4s0-3 .1-4C4 3.7 5.3 2.4 8 2.3c1-.1 1.3-.1 4-.1z"],
      facebook: ["Facebook", "M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"],
      telegram: ["Telegram", "M23.9 3.6 20.3 20.5c-.3 1.2-1 1.5-2 .9l-5.4-4-2.6 2.5c-.3.3-.5.5-1.1.5l.4-5.5 10-9c.4-.4-.1-.6-.7-.2L6.6 13.5 1.3 11.8c-1.2-.4-1.2-1.2.2-1.7L22.4 2c1-.4 1.8.2 1.5 1.6z"],
      twitter: ["X", "M18.2 2.3h3.4l-7.4 8.4L23 21.7h-6.8l-5.3-7-6.1 7H1.4l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4zm-1.2 17.4h1.9L7 4.2H5l12 15.5z"],
    };
    so.innerHTML = Object.entries(P.social || {}).filter(([, u]) => u).map(([k, u]) => {
      const [label, d] = icons[k] || [k, null];
      return `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${esc(label)}" title="${esc(label)}">${d ? `<svg viewBox="0 0 24 24"><path d="${d}"/></svg>` : esc(label[0])}</a>`;
    }).join("");
  }
})();
