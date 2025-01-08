const TOC_SELECTOR = '.md-sidebar--secondary nav.md-nav.md-nav--secondary';
const ICONS = {
    chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.22 8.22a.749.749 0 0 0 0 1.06l6.25 6.25a.749.749 0 0 0 1.06 0l6.25-6.25a.749.749 0 1 0-1.06-1.06L12 13.939 6.28 8.22a.749.749 0 0 0-1.06 0Z"></svg>`,
    chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.72 18.78a.75.75 0 0 1 0-1.06L14.44 12 8.72 6.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z"></svg>`
};

function createToggleButton(isCollapsed) {
    const toggleButton = document.createElement('span');
    toggleButton.className = 'toc-toggle';
    toggleButton.innerHTML = isCollapsed ? ICONS.chevronRight : ICONS.chevronDown;
    return toggleButton;
}

function toggleSublist(toggleButton, sublist, item) {
    const isCollapsed = sublist.style.display === 'none';
    sublist.style.display = isCollapsed ? 'block' : 'none';
    toggleButton.innerHTML = isCollapsed ? ICONS.chevronDown : ICONS.chevronRight;
    item.classList.toggle('toc-collapsed', !isCollapsed);
}

function processListItem(item) {
    const sublist = item.querySelector('ul');
    const link = item.querySelector('.md-nav__link');

    if (!sublist || !link || item.classList.contains('processed')) return;

    const href = link.getAttribute('href');
    const isCollapsed = href && document.getElementById(href.split('#')[1])?.classList.contains('collapsed');

    const container = document.createElement('div');
    container.className = 'toc-container';

    const linkClone = link.cloneNode(true);
    linkClone.className += ' toc-link';
    container.appendChild(linkClone);

    const toggleButton = createToggleButton(isCollapsed);
    container.appendChild(toggleButton);

    link.parentNode.replaceChild(container, link);

    if (isCollapsed) {
        sublist.style.display = 'none';
        item.classList.add('toc-collapsed');
    }

    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSublist(toggleButton, sublist, item);
    });

    item.classList.add('processed');
}

function addToggleButtons() {
    const tocContainer = document.querySelector(TOC_SELECTOR);
    if (!tocContainer) return;
    tocContainer.querySelectorAll('li').forEach(processListItem);
}

function setupObservers() {
    const tocContainer = document.querySelector(TOC_SELECTOR);
    if (!tocContainer) return;

    const observer = new MutationObserver(() => addToggleButtons());
    observer.observe(tocContainer, { childList: true, subtree: true });

    const globalObserver = new MutationObserver(() => {
        if (document.querySelector(TOC_SELECTOR)) {
            addToggleButtons();
            observer.observe(tocContainer, { childList: true, subtree: true });
        }
    });
    globalObserver.observe(document.body, { childList: true, subtree: true });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    addToggleButtons();
    setupObservers();
});