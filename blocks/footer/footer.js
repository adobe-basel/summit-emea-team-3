import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

const blankSuffix = '_blank';

function fixElements(element) {
  // Check if the element is a link and its text ends with '_blank'
  if (element.tagName === 'A' && element.textContent.trim().endsWith(blankSuffix)) {
    element.textContent = element.textContent.trim().slice(0, -blankSuffix.length);

    // Modify the link to open in a new window
    element.target = '_blank';
  }

  if (element.classList.contains('footer-left')) {
    const placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');
    element.children[0].append(placeholder);
  }

  if (element.classList.contains('footer-right')) {
    const placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');
    element.children[0].prepend(placeholder);
  }

  if (element.classList.contains('footer-right')) {
    element.querySelectorAll(':scope > div > div > p > strong > a').forEach((headerEl) => {
      headerEl.classList.add('button', 'secondary');
    });
  }

  if (element.classList.contains('footer-half')) {
    element.querySelectorAll(':scope > div > div > h3').forEach((headerEl) => {
      headerEl.addEventListener('click', () => {
        headerEl.parentElement.classList.toggle('expanded');
      });
    });
  }

  if (!element.children.length) return;

  for (let i = 0; i < element.children.length; i += 1) {
    const child = element.children[i];

    fixElements(child);
  }
}

/**
  * loads and decorates the footer
  * @param {Element} block The footer block element
  */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.classList.add('footer-container');
    footer.innerHTML = html;
    fixElements(footer);

    decorateIcons(footer);
    block.append(footer);
  }
}
