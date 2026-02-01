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

// =========================================================
  // Contato (Formspree) — sucesso na mesma página
  // Requer IDs no HTML:
  // #contactForm, #formStatus, #sendBtn, #contactCard, #successCard
  // =========================================================
  const form = document.getElementById("contactForm");
  if (form) {
    const statusEl = document.getElementById("formStatus");
    const sendBtn = document.getElementById("sendBtn");
    const contactCard = document.getElementById("contactCard");
    const successCard = document.getElementById("successCard");

    const setStatus = (msg, type) => {
      if (!statusEl) return;
      statusEl.textContent = msg || "";
      statusEl.className = "form-status" + (type ? " " + type : "");
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // validação nativa
      if (!form.checkValidity()) {
        setStatus("Confere os campos obrigatórios antes de enviar.", "err");
        return;
      }

      setStatus("Enviando…", "");
      if (sendBtn) sendBtn.disabled = true;

      try {
        const formData = new FormData(form);

        const res = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          form.reset();
          setStatus("", "");

          if (contactCard) contactCard.hidden = true;
          if (successCard) {
            successCard.hidden = false;
            successCard.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else {
          setStatus("Não consegui enviar agora. Tenta novamente em alguns segundos.", "err");
        }
      } catch (err) {
        setStatus("Falha de conexão. Verifica tua internet e tenta de novo.", "err");
      } finally {
        if (sendBtn) sendBtn.disabled = false;
      }
    });
  }
