import '../public/styles.css';

const navbar = document.querySelector('.main-nav__items')!;
navbar.addEventListener('click', event => {
  if (!(event.target instanceof HTMLElement)) return;
  if (event.target.tagName === 'UL') return;

  const navItem = event.target.closest('li')!;
  const currentlyActiveEl = document.querySelector('.main-nav__item--active')!;

  if (navItem === currentlyActiveEl) return;

  currentlyActiveEl.classList.remove('main-nav__item--active');
  navItem.classList.add('main-nav__item--active');
});
