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
// Contato (Formspree) — validação + sucesso na mesma página
// Requer IDs no HTML:
// #contactForm, #formStatus, #sendBtn, #contactCard, #successCard
// =========================================================
(() => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const statusEl = document.getElementById("formStatus");
  const sendBtn = document.getElementById("sendBtn");
  const contactCard = document.getElementById("contactCard");
  const successCard = document.getElementById("successCard");

  // Garante que o sucesso começa escondido (caso CSS/JS anterior tenha mexido)
  if (successCard) successCard.hidden = true;
  if (contactCard) contactCard.hidden = false;

  const setStatus = (msg, type) => {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    statusEl.className = "form-status" + (type ? " " + type : "");
  };

  const getFieldWrapper = (input) => input.closest(".field");

  const showFieldError = (input, message) => {
    const field = getFieldWrapper(input);
    if (!field) return;

    field.classList.add("is-invalid");

    const id = input.id;
    const errEl = field.querySelector(`[data-error-for="${id}"]`);
    if (errEl) errEl.textContent = message || "Campo obrigatório.";
  };

  const clearFieldError = (input) => {
    const field = getFieldWrapper(input);
    if (!field) return;

    field.classList.remove("is-invalid");

    const id = input.id;
    const errEl = field.querySelector(`[data-error-for="${id}"]`);
    if (errEl) errEl.textContent = "";
  };

  const messageFor = (input) => {
    const v = input.validity;

    if (v.valueMissing) return "Este campo é obrigatório.";
    if (v.typeMismatch && input.type === "email") return "Digite um e-mail válido.";
    if (v.tooShort) return `Digite pelo menos ${input.minLength} caracteres.`;
    if (v.patternMismatch) return "Formato inválido.";

    return "Campo inválido.";
  };

  const validateAll = () => {
    setStatus("", "");

    let ok = true;
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((el) => {
      if (el.name === "_gotcha" || el.type === "hidden") return;

      if (!el.checkValidity()) {
        ok = false;
        showFieldError(el, messageFor(el));
      } else {
        clearFieldError(el);
      }
    });

    if (!ok) setStatus("Confere os campos destacados antes de enviar.", "err");
    return ok;
  };

  // Limpa erro enquanto digita
  form.addEventListener("input", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return;
    if (el.name === "_gotcha" || el.type === "hidden") return;

    if (el.checkValidity()) clearFieldError(el);
  });

  // No blur, mostra erro se tiver
  form.addEventListener("blur", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return;
    if (el.name === "_gotcha" || el.type === "hidden") return;

    if (!el.checkValidity()) showFieldError(el, messageFor(el));
  }, true);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

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
})();

