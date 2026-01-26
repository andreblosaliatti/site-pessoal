document.addEventListener("DOMContentLoaded", () => {
  // Ano no footer (todas as páginas)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu mobile
  const menuBtn = document.getElementById("menuBtn");
  const navPanel = document.getElementById("navPanel");

  if (menuBtn && navPanel) {
    const closeMenu = () => {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Abrir menu");
      navPanel.classList.remove("is-open");
      setTimeout(() => (navPanel.hidden = true), 260);
    };

    const openMenu = () => {
      navPanel.hidden = false;
      requestAnimationFrame(() => navPanel.classList.add("is-open"));
      menuBtn.setAttribute("aria-expanded", "true");
      menuBtn.setAttribute("aria-label", "Fechar menu");
    };

    menuBtn.addEventListener("click", () => {
      const open = menuBtn.getAttribute("aria-expanded") === "true";
      open ? closeMenu() : openMenu();
    });

    navPanel.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a && a.classList.contains("nav-link")) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }
});
