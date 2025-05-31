import '../public/styles.css';

const navbar = document.querySelector('.main-nav__items')!;
navbar.addEventListener('click', event => {
    const clickedEl = event.target as HTMLElement;
    if (clickedEl.tagName === 'UL') {
        return;
    }

    const navItem = clickedEl.closest('li')!;
    const currentlyActiveEl = document.querySelector('.main-nav__item--active')!;
    if (navItem === currentlyActiveEl) {
        return;
    }

    currentlyActiveEl.classList.remove('main-nav__item--active');
    navItem.classList.add('main-nav__item--active');
});

console.log('kir');
