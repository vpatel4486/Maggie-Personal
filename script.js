function init() {
  const now = new Date();
  const params = new URLSearchParams(location.search);
  const unlockAll = params.get('unlock') === 'all';

  document.querySelectorAll('.vcard').forEach(card => {
    const unlockDate = new Date(card.dataset.date + "T00:00:00");
    if (unlockAll || now >= unlockDate) {
      card.classList.add('unlocked');
    }
  });
}

function flip(btn) { btn.closest('.vcard').classList.toggle('flipped'); }

function showAndScrollToPropose() {
  const now = new Date();
  const unlockDate = new Date("2026-02-08T00:00:00");
  const params = new URLSearchParams(location.search);
  const unlockAll = params.get('unlock') === 'all';

  if (unlockAll || now >= unlockDate) {
    const section = document.getElementById('propose-day');
    section.style.display = 'grid';
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function hideAndGoBack() {
  const section = document.getElementById('propose-day');
  document.getElementById('week').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => { section.style.display = 'none'; }, 600);
}

const noBtn = document.getElementById('noBtn');
const arena = document.getElementById('arena');
const yesBtn = document.getElementById('yesBtn');

if (noBtn) {
    noBtn.addEventListener('mouseover', () => {
      const arenaRect = arena.getBoundingClientRect();
      const btnRect = noBtn.getBoundingClientRect();
      // Safe margins so it doesn't leave the pink box
      const maxX = arenaRect.width - btnRect.width;
      const maxY = arenaRect.height - btnRect.height;
      
      const randomX = Math.max(0, Math.floor(Math.random() * maxX));
      const randomY = Math.max(0, Math.floor(Math.random() * maxY));
      
      noBtn.style.left = randomX + 'px';
      noBtn.style.top = randomY + 'px';
      noBtn.style.transform = 'none';
    });
}

if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      document.getElementById('finalReveal').classList.add('show');
      spawnHearts();
    });
}

function spawnHearts() {
  for(let i=0; i<35; i++) {
    const h = document.createElement('div');
    h.className = 'heart'; h.textContent = '💖';
    h.style.left = Math.random() * 100 + 'vw'; h.style.top = '100vh';
    h.style.fontSize = (Math.random() * 20 + 20) + 'px';
    h.style.transition = 'transform 2s ease-out, opacity 2s';
    document.body.appendChild(h);
    setTimeout(() => {
      h.style.transform = `translateY(-110vh) rotate(${Math.random()*360}deg)`;
      h.style.opacity = '0';
    }, 50);
    setTimeout(() => h.remove(), 2500);
  }
}

window.onload = init;