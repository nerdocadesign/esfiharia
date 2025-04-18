// Função para salvar os dados no localStorage
function salvarProduto() {
  const nome = document.getElementById('produto-nome').value;
  const preco = document.getElementById('produto-preco').value;
  const descricao = document.getElementById('produto-descricao').value;

  const produto = {
    nome,
    preco,
    descricao
  };

  // Armazenar no localStorage (você pode usar um objeto com múltiplos produtos)
  localStorage.setItem('produto', JSON.stringify(produto));

  alert('Produto salvo com sucesso!');
}

// Função para limpar os dados do formulário
function limparDados() {
  document.getElementById('produto-nome').value = '';
  document.getElementById('produto-preco').value = '';
  document.getElementById('produto-descricao').value = '';
}

// Função para carregar os dados do localStorage
function carregarDados() {
  const produto = JSON.parse(localStorage.getItem('produto'));

  if (produto) {
    document.getElementById('produto-nome').value = produto.nome;
    document.getElementById('produto-preco').value = produto.preco;
    document.getElementById('produto-descricao').value = produto.descricao;
  }
}

// Carregar os dados ao carregar a página
window.onload = carregarDados;
