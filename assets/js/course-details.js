/* Course details page extras: countdown, back-to-top, progress bars */
(function () {
  // Countdown — 6 days from now
  const target = new Date(
    Date.now() + 6 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000,
  );
  const elD = document.getElementById('cdD'),
    elH = document.getElementById('cdH'),
    elM = document.getElementById('cdM'),
    elS = document.getElementById('cdS');
  function pad(n) {
    return String(n).padStart(2, '0');
  }
  function tick() {
    const diff = Math.max(0, target - new Date());
    const d = Math.floor(diff / 86400000),
      h = Math.floor(diff / 3600000) % 24,
      m = Math.floor(diff / 60000) % 60,
      s = Math.floor(diff / 1000) % 60;
    if (elD) {
      elD.textContent = pad(d);
      elH.textContent = pad(h);
      elM.textContent = pad(m);
      elS.textContent = pad(s);
    }
  }
  tick();
  setInterval(tick, 1000);

  // Back to top
  const top = document.querySelector('[data-back-top]');
  if (top) {
    window.addEventListener('scroll', () =>
      top.classList.toggle('show', window.scrollY > 500),
    );
    top.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' }),
    );
  }

  // IntersectionObserver to trigger bar fills + reveal
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view', 'is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  document
    .querySelectorAll('.career-card,.progress-demo,.reveal')
    .forEach((el) => io.observe(el));

  // Play button now uses Bootstrap modal - no alert needed
  // Modal is triggered via data-bs-toggle and data-bs-target attributes

  // Video player for intro lecture
  const publicLessons = document.querySelectorAll('.lesson-public');
  publicLessons.forEach((lesson) => {
    lesson.addEventListener('click', function (e) {
      e.preventDefault();
      const preview = document.getElementById('fullVideoPreview');
      if (preview) {
        // Scroll to video player
        preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Add highlight animation
        preview.classList.add('highlight');
        setTimeout(() => preview.classList.remove('highlight'), 2500);
      }
    });
    // Add visual feedback
    lesson.style.cursor = 'pointer';
  });

  // Security: Prevent right-click context menu on video iframes
  const videoIframes = document.querySelectorAll('.cd-player-wrapper iframe');
  videoIframes.forEach((iframe) => {
    iframe.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  });

  // Additional security: Disable keyboard shortcuts for video download
  document.addEventListener('keydown', function (e) {
    // Prevent common download shortcuts on video area
    if (e.target.closest('.cd-video-container')) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
      }
    }
  });

  // Initialize Plyr video player
  setTimeout(() => {
    const player = new Plyr('#player', {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'settings',
        'fullscreen',
      ],
      settings: ['captions', 'quality', 'speed'],
      quality: { default: 720, options: [360, 720, 1080] },
      tooltips: { controls: true, seek: true },
      iconUrl: 'https://cdn.plyr.io/3.7.8/plyr.svg',
    });

    const playerFull = new Plyr('#player-full', {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'settings',
        'fullscreen',
      ],
      settings: ['captions', 'quality', 'speed'],
      quality: { default: 720, options: [360, 720, 1080] },
      tooltips: { controls: true, seek: true },
      iconUrl: 'https://cdn.plyr.io/3.7.8/plyr.svg',
    });
  }, 100);

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
