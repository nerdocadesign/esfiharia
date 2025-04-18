let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let stateSelecionados = [];
const divProdutos = document.getElementById("produtos");
const msgVazia = document.getElementById("mensagem-vazia");

function renderProdutos(lista) {
  divProdutos.innerHTML = "";
  lista.forEach((produto, index) => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerText = produto.nome;
    div.onclick = () => toggleProduto(index);
    if (stateSelecionados.includes(index)) div.classList.add("selecionado");
    divProdutos.appendChild(div);
  });
  msgVazia.style.display = lista.length === 0 ? "block" : "none";
}

function toggleProduto(index) {
  if (stateSelecionados.includes(index)) {
    stateSelecionados = stateSelecionados.filter(i => i !== index);
  } else {
    stateSelecionados.push(index);
  }
  filtrarCategoria(categoriaAtual);
}

let categoriaAtual = "todas";
function filtrarCategoria(categoria) {
  categoriaAtual = categoria;
  if (categoria === "pedido") {
    const selecionados = produtos.filter((_, i) => stateSelecionados.includes(i));
    renderProdutos(selecionados);
  } else if (categoria === "todas") {
    renderProdutos(produtos);
  } else {
    const filtrados = produtos.map((p, i) => ({ ...p, i })).filter(p => p.categoria === categoria);
    renderProdutos(filtrados.map(p => produtos[p.i]));
  }
}

function enviarPedido() {
  const selecionados = produtos.filter((_, i) => stateSelecionados.includes(i));
  if (selecionados.length === 0) {
    alert("Selecione ao menos um item!");
    return;
  }
  const msg = selecionados.map(p => `- ${p.nome}`).join("\n");
  const url = `https://wa.me/?text=${encodeURIComponent("Olá, quero fazer o seguinte pedido:\n" + msg)}`;
  window.open(url, "_blank");
}

filtrarCategoria("todas");