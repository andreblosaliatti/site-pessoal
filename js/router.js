// ===============================
// ROUTER SIMPLES (HASH)
// ===============================

const app = document.getElementById("app");

function router() {
  const route = location.hash.replace("#", "") || "/";

  switch (route) {
    case "/":
      renderHome();
      break;

    case "/sobre":
      renderSobre();
      break;

    case "/projetos":
      renderProjetos();
      break;

    case "/blog":
      renderBlog();
      break;

    case "/contato":
      renderContato();
      break;

    default:
      renderNotFound();
  }
}

// ===============================
// RENDERS (temporários)
// ===============================

function renderHome() {
  app.innerHTML = `
    <section>
      <h1>André Blos Aliatti</h1>
      <p>Desenvolvedor Web • Frontend & Backend</p>
    </section>
  `;
}

function renderSobre() {
  app.innerHTML = `
    <section>
      <h1>Sobre</h1>
      <p>Desenvolvedor focado em soluções web completas.</p>
    </section>
  `;
}

function renderProjetos() {
  app.innerHTML = `
    <section>
      <h1>Projetos</h1>
      <p>Em breve lista de projetos.</p>
    </section>
  `;
}

function renderBlog() {
  app.innerHTML = `
    <section>
      <h1>Blog</h1>
      <p>Artigos técnicos e estudos de caso.</p>
    </section>
  `;
}

function renderContato() {
  app.innerHTML = `
    <section>
      <h1>Contato</h1>
      <p>Entre em contato comigo.</p>
    </section>
  `;
}

function renderNotFound() {
  app.innerHTML = `
    <section>
      <h1>404</h1>
      <p>Página não encontrada.</p>
    </section>
  `;
}

// ===============================
// LISTENERS
// ===============================

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
