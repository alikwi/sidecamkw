const modal = document.getElementById('clipModal');
const modalTitle = document.getElementById('modalTitle');
const modalPlayer = document.getElementById('modalPlayer');

document.querySelectorAll('.clip-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.dataset.title;
    modalPlayer.textContent = `${card.dataset.player} · Player clip`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

document.getElementById('playerSearch').addEventListener('submit', e => {
  e.preventDefault();
  const value = document.getElementById('searchInput').value.trim();
  const result = document.getElementById('searchResult');
  if(!value){
    result.hidden = false;
    result.textContent = 'Enter a player name or jersey number to search.';
    return;
  }
  result.hidden = false;
  result.innerHTML = `<strong style="color:#b6ff3f">${value}</strong> — demo search complete. The live player database will be connected in the next build.`;
});

document.querySelector('.menu-btn').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('mobile-open');
});

const style = document.createElement('style');
style.textContent = `.nav.mobile-open{display:flex;position:absolute;top:76px;left:0;right:0;padding:22px 7vw;background:#0a0d10;border-bottom:1px solid #252a2f;flex-direction:column;gap:20px}.nav.mobile-open a{font-size:12px}`;
document.head.appendChild(style);
