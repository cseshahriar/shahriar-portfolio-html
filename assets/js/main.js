/* =====================================================
   Shahriar Hosen — Site JS
   ===================================================== */

// ---------- Theme toggle ----------
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-theme-toggle]');
    if (!btn) return;
    const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    document.querySelectorAll('[data-theme-icon]').forEach((i) => {
      i.className = next === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
    });
  });
  // initialize icon
  document.addEventListener('DOMContentLoaded', () => {
    const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    document.querySelectorAll('[data-theme-icon]').forEach((i) => {
      i.className = cur === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
    });
  });
})();

// ---------- Active nav link ----------
const setActiveNavLink = (hash) => {
  document.querySelectorAll('.site-nav .nav-link').forEach((link) => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (location.hash) {
    setActiveNavLink(location.hash);
  } else if (
    location.pathname === '/' ||
    location.pathname.endsWith('/index.html')
  ) {
    setActiveNavLink('/');
  }
  const sections = Array.from(document.querySelectorAll('section[id]')).filter(
    (s) => document.querySelector(`.site-nav .nav-link[href="#${s.id}"]`),
  );

  if (sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNavLink(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.35, rootMargin: '-25% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
  }
});

document.addEventListener('click', (e) => {
  const link = e.target.closest('.site-nav .nav-link[href^="#"]');
  if (!link) return;
  const targetId = link.getAttribute('href');
  if (!targetId || targetId === '#') return;
  const section = document.querySelector(targetId);
  if (!section) return;
  e.preventDefault();
  setActiveNavLink(targetId);
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ---------- Counter animation ----------
const animateCounter = (el) => {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent =
      (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        if (e.target.matches('[data-counter]')) animateCounter(e.target);
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('.reveal, [data-counter]')
    .forEach((el) => io.observe(el));
});

// ---------- Project filters ----------
document.addEventListener('click', (e) => {
  const chip = e.target.closest('[data-filter]');
  if (!chip) return;
  const group = chip.closest('.filter-bar');
  const target = chip.dataset.filter;
  group
    .querySelectorAll('.filter-chip')
    .forEach((c) => c.classList.remove('active'));
  chip.classList.add('active');
  document.querySelectorAll('[data-category]').forEach((card) => {
    const show = target === 'all' || card.dataset.category === target;
    card.style.display = show ? '' : 'none';
  });
});

// ---------- Mobile menu close on click ----------
document.addEventListener('click', (e) => {
  if (e.target.closest('.navbar-nav .nav-link')) {
    const nav = document.querySelector('.navbar-collapse.show');
    if (nav) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  }
});

// ---------- Project detail modal ----------
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-project-open]');
  if (!btn) return;
  const card = btn.closest('.project-card');
  if (!card) return;
  const m = document.getElementById('projectModal');
  if (!m) return;
  m.querySelector('[data-pm-title]').textContent = card.dataset.title || '';
  m.querySelector('[data-pm-desc]').textContent = card.dataset.desc || '';
  m.querySelector('[data-pm-stack]').innerHTML = (card.dataset.stack || '')
    .split(',')
    .map((s) => `<span>${s.trim()}</span>`)
    .join('');
  m.querySelector('[data-pm-github]').href = card.dataset.github || '#';
  m.querySelector('[data-pm-demo]').href = card.dataset.demo || '#';
  bootstrap.Modal.getOrCreateInstance(m).show();
});

// ---------- Contact form (no backend) ----------
document.addEventListener('submit', (e) => {
  const f = e.target.closest('[data-contact-form]');
  if (!f) return;
  e.preventDefault();
  const note = f.querySelector('[data-form-note]');
  if (note) {
    note.textContent =
      "✅ Thanks! Your message has been queued. I'll reach out within 24 hours.";
    note.style.color = 'var(--green-700)';
  }
  f.reset();
});

// ---------- Footer year ----------
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// ---------- Back to top button ----------
document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  const toggleBackBtn = () => {
    backBtn.classList.toggle('show', window.scrollY > 300);
  };

  window.addEventListener('scroll', toggleBackBtn);
  backBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }),
  );
  toggleBackBtn();
});

// ---------- Skill bar animation ----------
const skillIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        skillIO.unobserve(e.target);
      }
    });
  },
  { threshold: 0.2 },
);
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.skill-card .skill-list').forEach((list) => {
    skillIO.observe(list.closest('.skill-card'));
  });
});

/* ===== BLOG: search + filter + tags + reply ===== */
(function () {
  var grid = document.getElementById('blogGrid');
  if (!grid) return;
  var cards = Array.prototype.slice.call(
    grid.querySelectorAll('[data-category]'),
  );
  var search = document.getElementById('blogSearch');
  var empty = document.getElementById('blogEmpty');
  var chips = document.querySelectorAll('.filter-chip');
  var sideCats = document.querySelectorAll('[data-side-cat]');
  var tagLinks = document.querySelectorAll('.widget-tags a[data-tag]');
  var state = { cat: 'all', q: '', tag: '' };

  function apply() {
    var q = state.q.trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (card) {
      var cat = card.getAttribute('data-category') || '';
      var tags = (card.getAttribute('data-tags') || '').toLowerCase();
      var text = (card.innerText || '').toLowerCase();
      var matchCat = state.cat === 'all' || cat === state.cat;
      var matchTag = !state.tag || tags.indexOf(state.tag) !== -1;
      var matchQ = !q || text.indexOf(q) !== -1 || tags.indexOf(q) !== -1;
      var on = matchCat && matchTag && matchQ;
      card.style.display = on ? '' : 'none';
      if (on) shown++;
    });
    if (empty) empty.classList.toggle('d-none', shown !== 0);
  }

  if (search)
    search.addEventListener('input', function (e) {
      state.q = e.target.value;
      apply();
    });

  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) {
        x.classList.remove('active');
      });
      c.classList.add('active');
      state.cat = c.getAttribute('data-filter') || 'all';
      state.tag = '';
      tagLinks.forEach(function (t) {
        t.classList.remove('active');
      });
      apply();
    });
  });

  sideCats.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var cat = a.getAttribute('data-side-cat') || 'all';
      state.cat = cat;
      state.tag = '';
      chips.forEach(function (x) {
        x.classList.toggle(
          'active',
          (x.getAttribute('data-filter') || '') === cat,
        );
      });
      tagLinks.forEach(function (t) {
        t.classList.remove('active');
      });
      apply();
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  tagLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var tag = (a.getAttribute('data-tag') || '').toLowerCase();
      if (state.tag === tag) {
        state.tag = '';
        a.classList.remove('active');
      } else {
        state.tag = tag;
        tagLinks.forEach(function (t) {
          t.classList.remove('active');
        });
        a.classList.add('active');
      }
      apply();
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ===== BLOG DETAILS: reply button focuses comment form ===== */
(function () {
  var replies = document.querySelectorAll('.c-reply');
  var form = document.getElementById('leave-reply');
  if (!form || !replies.length) return;
  replies.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name =
        (btn.closest('.comment').querySelector('.c-head strong') || {})
          .innerText || '';
      var ta = form.querySelector('textarea');
      if (ta) {
        ta.value = '@' + name + ' ';
        ta.focus();
      }
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  var likes = document.querySelectorAll('.c-like');
  likes.forEach(function (b) {
    b.addEventListener('click', function () {
      var m = b.innerText.match(/(\d+)/);
      var n = m ? parseInt(m[1], 10) + 1 : 1;
      b.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i> ' + n;
      b.style.color = 'var(--green-700)';
    });
  });
})();
