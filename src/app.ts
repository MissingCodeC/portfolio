import '../public/styles.css';

const navbar = document.querySelector('.main-nav__items')! as HTMLUListElement;
navbar.addEventListener('click', event => {
    const clickedEl = event.target as HTMLElement;
    if (clickedEl.tagName === 'UL') {
        return;
    }

    const navItem = clickedEl.closest('li') as HTMLLIElement;
    const currentlyActiveEl = document.querySelector('.main-nav__item--active') as HTMLLIElement;
    if (navItem === currentlyActiveEl) {
        return;
    }

    currentlyActiveEl.classList?.remove('main-nav__item--active');
    navItem.classList?.add('main-nav__item--active');
});
