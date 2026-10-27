document.querySelectorAll('details.bahar-desktop-menu-group, details.bahar-mobile-navigation').forEach(menu => {
  document.addEventListener('pointerdown', event => { if (!menu.contains(event.target)) menu.open = false; });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary')?.focus(); }
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  if (menu.classList.contains('bahar-mobile-navigation')) menu.addEventListener('toggle', () => {
    menu.querySelector('summary')?.setAttribute('aria-label', menu.open ? 'Close BAHAR navigation' : 'Open BAHAR navigation');
  });
});
document.querySelectorAll('.bahar-onur-gokmen-viewer').forEach(viewer => {
  const stage = viewer.querySelector('.bahar-onur-gokmen-stage img');
  const buttons = [...viewer.querySelectorAll('.bahar-onur-gokmen-thumbnails button')];
  let active = 0;
  const show = index => {
    active = (index + buttons.length) % buttons.length;
    const image = buttons[active].querySelector('img');
    stage.src = image.src;
    stage.alt = buttons[active].getAttribute('aria-label') ?? '';
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === active)));
  };
  if (!buttons.length || !stage) return;
  buttons.forEach((button, i) => button.addEventListener('click', () => show(i)));
  viewer.querySelector('.previous')?.addEventListener('click', () => show(active - 1));
  viewer.querySelector('.next')?.addEventListener('click', () => show(active + 1));
});