document.addEventListener('DOMContentLoaded', event => {

  document.querySelectorAll('[data-expand]').forEach(element => {
    if (!element.offsetParent) return;

    const content = document.querySelector(element.dataset.expand);
    const excerpt = parseInt(element.dataset.excerpt);

    if (!content || Number.isNaN(excerpt)) return;

    let handled = false;

    Array.from(content.children).slice(excerpt).forEach(el => {
      handled = true;
      el.setAttribute('hidden', 'true');
    });

    if (!handled) return element.remove();

    element.addEventListener('click', event => {
      event.preventDefault();

      Array.from(content.children).forEach(child => {
        child.removeAttribute('hidden');
      });

      element.remove();
    });
  });

});

window.addEventListener('load', event => {
  document.documentElement.classList.add('is-ready');
  if (window.AOS) window.AOS.init();
});
