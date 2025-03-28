function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
function atualizarListaClientes() {
    const listaClientes = document.getElementById('clientes-lista');
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    listaClientes.innerHTML = '';

    if (clientes.length === 0) {
        listaClientes.innerHTML = '<tr><td colspan="5">Nenhum cliente cadastrado ainda.</td></tr>';
    } else {
        clientes.forEach((cliente, index) => {
            const dataAtual = new Date();
            const dia = String(dataAtual.getDate()).padStart(2, '0');
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
            const dataFormatada = `${dia}/${mes}`;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.cpf}</td>
                <td>${cliente.email}</td>
                <td>${cliente.logradouro}</td>
                <td>
                    <button onclick="editarCliente(${index})">Editar</button>
                    <button onclick="excluirCliente(${index})">Excluir</button>
                </td>
            `;
            listaClientes.appendChild(row);
        });
    }
}


document.getElementById('cliente-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = formatarCPF(document.getElementById('cpf').value);
    const email = document.getElementById('email').value;
    const logradouro = document.getElementById('logradouro').value;

  
    if (!nome || !cpf || !email || !logradouro) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

  
    const cliente = { nome, cpf, email, logradouro };

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    clientes.push(cliente);

    localStorage.setItem('clientes', JSON.stringify(clientes));


    alert('Cliente cadastrado com sucesso!');


    document.getElementById('cliente-form').reset();

    atualizarListaClientes();
});

function editarCliente(index) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const cliente = clientes[index];

    document.getElementById('nome').value = cliente.nome;
    document.getElementById('cpf').value = cliente.cpf;
    document.getElementById('email').value = cliente.email;
    document.getElementById('logradouro').value = cliente.logradouro;

    excluirCliente(index);
}

function excluirCliente(index) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    clientes.splice(index, 1);

    localStorage.setItem('clientes', JSON.stringify(clientes));

    atualizarListaClientes();
}

window.onload = function() {
    atualizarListaClientes();
};

document.getElementById('novo-cliente-btn').addEventListener('click', function() {
    document.getElementById('cliente-form').reset();
});

document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.substring(0, 3) + '.' + value.substring(3);
    if (value.length > 7) value = value.substring(0, 7) + '.' + value.substring(7);
    if (value.length > 11) value = value.substring(0, 11) + '-' + value.substring(11);
    e.target.value = value.substring(0, 14);
});