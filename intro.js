(function () {
  const overlay = document.getElementById('lotusIntro');
  if (!overlay) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadyPlayed = sessionStorage.getItem('lotusIntroPlayed');

  if (reducedMotion || alreadyPlayed) {
    overlay.remove();
    return;
  }

  const RING_COUNT = 5;
  const PETALS_PER_RING = 8;
  const CORE_PETALS = 10;

  const scene = overlay.querySelector('.li-scene');
  const core = overlay.querySelector('.li-core');

  for (let r = 0; r < RING_COUNT; r++) {
    const ring = document.createElement('div');
    ring.className = 'li-ring';
    for (let p = 0; p < PETALS_PER_RING; p++) {
      const petal = document.createElement('div');
      petal.className = 'li-petal';
      petal.style.setProperty('--a', (p * (360 / PETALS_PER_RING)) + 'deg');
      ring.appendChild(petal);
    }
    scene.appendChild(ring);
  }

  for (let i = 0; i < CORE_PETALS; i++) {
    const petal = document.createElement('div');
    petal.className = 'li-core-petal';
    petal.style.setProperty('--a', (i * (360 / CORE_PETALS)) + 'deg');
    petal.style.setProperty('--i', i);
    core.appendChild(petal);
  }

  let finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    sessionStorage.setItem('lotusIntroPlayed', '1');
    overlay.classList.add('li-done');
    setTimeout(() => overlay.remove(), 650);
  }

  overlay.addEventListener('click', finish);
  window.addEventListener('keydown', finish, { once: true });
  setTimeout(finish, 3100);
})();
