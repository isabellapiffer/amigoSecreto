const amigos = [];

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
  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById("lista-amigos");
  lista.innerHTML = amigos
    .map((nome, i) => `${i + 1}. ${nome}`)
    .join("<br>");
}

function sortear() {
  if (amigos.length < 2) {
    alert("Adicione pelo menos 2 amigos para sortear.");
    return;
  }

  const sorteados = [...amigos];

  // Embaralha até garantir que ninguém tira o próprio nome
  let resultado;
  do {
    resultado = embaralhar([...sorteados]);
  } while (resultado.some((sorteado, i) => sorteado === amigos[i]));

  const listaSorteio = document.getElementById("lista-sorteio");
  listaSorteio.innerHTML = amigos
    .map((nome, i) => `<strong>${nome}</strong> → ${resultado[i]}`)
    .join("<br>");
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

// Permite adicionar pressionando Enter
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nome-amigo").addEventListener("keydown", (e) => {
    if (e.key === "Enter") adicionar();
  });
});