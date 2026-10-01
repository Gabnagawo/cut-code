// Cut & Code — interações leves (sem dependências)
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ano no rodapé
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Reveal ao rolar
  const items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        // escalonamento entre irmãos
        const siblings = [...e.target.parentElement.children].filter((c) => c.classList.contains('reveal'));
        e.target.style.transitionDelay = `${Math.min(siblings.indexOf(e.target), 6) * 80}ms`;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  }

  // Reflexo especular do vidro seguindo o cursor
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.glass').forEach((el) => {
      el.addEventListener('pointermove', (ev) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${ev.clientX - r.left}px`);
        el.style.setProperty('--my', `${ev.clientY - r.top}px`);
        el.style.setProperty('--glow', '1');
      });
      el.addEventListener('pointerleave', () => el.style.setProperty('--glow', '.6'));
    });
  }

  // Links ainda não definidos (WhatsApp, Instagram, sites dos clientes)
  document.querySelectorAll('[data-placeholder]').forEach((a) => {
    if (a.getAttribute('href') !== '#') return;
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      console.info(`[Cut & Code] Link pendente: ${a.dataset.placeholder}`);
    });
  });
})();
