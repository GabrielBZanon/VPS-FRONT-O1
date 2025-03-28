function atualizarListaProdutos() {
    const listaProdutos = document.getElementById('produtos-lista');
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    listaProdutos.innerHTML = '';

    if (produtos.length === 0) {
        listaProdutos.innerHTML = 'Nenhum produto cadastrado ainda.';
    } else {
        produtos.forEach((produto, index) => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto-item');
            produtoDiv.innerHTML = `
                <strong>Nome:</strong> ${produto.nome} <br>
                <strong>Descrição:</strong> ${produto.descricao} <br>
                <strong>Valor de Custo:</strong> R$ ${produto.valorCusto} <br>
                <strong>Valor Final:</strong> R$ ${produto.valorFinal} <br>
                <button onclick="editarProduto(${index})">Editar</button>
                <button onclick="excluirProduto(${index})">Excluir</button>
                <br><br>
            `;
            listaProdutos.appendChild(produtoDiv);
        });
    }
}

document.getElementById('produto-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const valorCusto = parseFloat(document.getElementById('valor-custo').value);
    const valorFinal = parseFloat(document.getElementById('valor-final').value);

    if (!nome || !descricao || isNaN(valorCusto) || isNaN(valorFinal)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const produto = { nome, descricao, valorCusto, valorFinal };

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    produtos.push(produto);

    localStorage.setItem('produtos', JSON.stringify(produtos));

    alert('Produto cadastrado com sucesso!');

    document.getElementById('produto-form').reset();

    atualizarListaProdutos();
});

function editarProduto(index) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produto = produtos[index];

    document.getElementById('nome').value = produto.nome;
    document.getElementById('descricao').value = produto.descricao;
    document.getElementById('valor-custo').value = produto.valorCusto;
    document.getElementById('valor-final').value = produto.valorFinal;

    excluirProduto(index);
}

function excluirProduto(index) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    produtos.splice(index, 1);

    localStorage.setItem('produtos', JSON.stringify(produtos));

    atualizarListaProdutos();
}

window.onload = function() {
    atualizarListaProdutos();
};

document.getElementById('novo-produto-btn').addEventListener('click', function() {
    document.getElementById('produto-form').reset();
});
