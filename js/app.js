const amigos = [];

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

const iconeOlho = `<svg class="sorteio__icone-olho" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

function invalidarSorteio() {
  document.getElementById("lista-sorteio").innerHTML = "";
}

function adicionar() {
  const input = document.getElementById("nome-amigo");
  const nome = input.value.trim();

  if (nome === "") {
    alert("Digite um nome antes de adicionar.");
    return;
  }

  if (amigos.includes(nome)) {
    alert(`"${nome}" já foi adicionado.`);
    return;
  }

  amigos.push(nome);
  input.value = "";
  input.focus();
  invalidarSorteio();
  atualizarLista();
}

function removerAmigo(indice) {
  amigos.splice(indice, 1);
  invalidarSorteio();
  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById("lista-amigos");
  lista.innerHTML = amigos
    .map(
      (nome, i) =>
        `<div class="friends__row">
          <button type="button" class="friends__remover" onclick="removerAmigo(${i})" aria-label="Remover da lista">×</button>
          <span class="friends__nome">${i + 1}. ${escapeHtml(nome)}</span>
        </div>`
    )
    .join("");
}

function configurarBotoesRevelar(container) {
  container.querySelectorAll(".sorteio__olho").forEach((btn) => {
    btn.addEventListener("click", () => {
      const linha = btn.closest(".sorteio__linha");
      const mascara = linha.querySelector(".sorteio__mascara");
      const valor = linha.querySelector(".sorteio__valor");
      const revelado = !valor.hasAttribute("hidden");

      if (revelado) {
        valor.setAttribute("hidden", "");
        mascara.removeAttribute("hidden");
        btn.setAttribute("aria-pressed", "false");
        btn.setAttribute("aria-label", "Revelar destinatário");
      } else {
        mascara.setAttribute("hidden", "");
        valor.removeAttribute("hidden");
        btn.setAttribute("aria-pressed", "true");
        btn.setAttribute("aria-label", "Ocultar destinatário");
      }
    });
  });
}

function sortear() {
  if (amigos.length < 2) {
    alert("Adicione pelo menos 2 amigos para sortear.");
    return;
  }

  const sorteados = [...amigos];

  let resultado;
  do {
    resultado = embaralhar([...sorteados]);
  } while (resultado.some((sorteado, i) => sorteado === amigos[i]));

  const listaSorteio = document.getElementById("lista-sorteio");
  listaSorteio.innerHTML = amigos
    .map(
      (nome, i) =>
        `<div class="sorteio__linha">
          <span class="sorteio__quem"><strong>${escapeHtml(nome)}</strong> → </span>
          <span class="sorteio__destino">
            <span class="sorteio__mascara">••••••</span>
            <span class="sorteio__valor" hidden>${escapeHtml(resultado[i])}</span>
          </span>
          <button type="button" class="sorteio__olho" aria-label="Revelar destinatário" aria-pressed="false">${iconeOlho}</button>
        </div>`
    )
    .join("");

  configurarBotoesRevelar(listaSorteio);
}

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function reiniciar() {
  amigos.length = 0;
  document.getElementById("lista-amigos").innerHTML = "";
  document.getElementById("lista-sorteio").innerHTML = "";
  document.getElementById("nome-amigo").value = "";
  document.getElementById("nome-amigo").focus();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", (e) => e.preventDefault());
  }

  document.getElementById("nome-amigo").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      adicionar();
    }
  });
});
