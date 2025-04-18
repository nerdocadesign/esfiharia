let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
  renderLista();
}

document.getElementById("produtoForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const categoria = document.getElementById("categoria").value.trim().toLowerCase();
  if (!nome || !categoria) return;
  produtos.push({ nome, categoria });
  salvarProdutos();
  e.target.reset();
});

function removerProduto(index) {
  produtos.splice(index, 1);
  salvarProdutos();
}

function renderLista() {
  const lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";
  produtos.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
      <strong>${p.nome}</strong> (${p.categoria})
      <button onclick="removerProduto(${i})">Remover</button>
    `;
    lista.appendChild(div);
  });
}

renderLista();