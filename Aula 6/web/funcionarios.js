function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length === 11) {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    }
    return telefone;
}

function atualizarListaFuncionarios() {
    const listaFuncionarios = document.getElementById('funcionarios-lista');
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];

    listaFuncionarios.innerHTML = '';

    if (funcionarios.length === 0) {
        listaFuncionarios.innerHTML = '<tr><td colspan="6">Nenhum funcionário cadastrado ainda.</td></tr>';
    } else {
        funcionarios.forEach((funcionario, index) => {
            const dataAtual = new Date();
            const dia = String(dataAtual.getDate()).padStart(2, '0');
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
            const dataFormatada = `${dia}/${mes}`;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${funcionario.nome}</td>
                <td>${funcionario.cpf}</td>
                <td>${funcionario.email}</td>
                <td>${funcionario.telefone}</td>
                <td>${funcionario.logradouro}</td>
                <td>
                    <button onclick="editarFuncionario(${index})">Editar</button>
                    <button onclick="excluirFuncionario(${index})">Excluir</button>
                </td>
            `;
            listaFuncionarios.appendChild(row);
        });
    }
}

document.getElementById('funcionario-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const cpf = formatarCPF(document.getElementById('cpf').value);
    const email = document.getElementById('email').value;
    const telefone = formatarTelefone(document.getElementById('telefone').value);
    const logradouro = document.getElementById('logradouro').value;

    if (!nome || !cpf || !email || !telefone || !logradouro) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const funcionario = { nome, cpf, email, telefone, logradouro };

    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];

    funcionarios.push(funcionario);

    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    alert('Funcionário cadastrado com sucesso!');

    document.getElementById('funcionario-form').reset();

    atualizarListaFuncionarios();
});

function editarFuncionario(index) {
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const funcionario = funcionarios[index];

    document.getElementById('nome').value = funcionario.nome;
    document.getElementById('cpf').value = funcionario.cpf;
    document.getElementById('email').value = funcionario.email;
    document.getElementById('telefone').value = funcionario.telefone;
    document.getElementById('logradouro').value = funcionario.logradouro;

    excluirFuncionario(index);
}

function excluirFuncionario(index) {
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];

    funcionarios.splice(index, 1);

    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    atualizarListaFuncionarios();
}

window.onload = function() {
    atualizarListaFuncionarios();
};


document.getElementById('novo-funcionario-btn').addEventListener('click', function() {
    document.getElementById('funcionario-form').reset();
});


document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.substring(0, 3) + '.' + value.substring(3);
    if (value.length > 7) value = value.substring(0, 7) + '.' + value.substring(7);
    if (value.length > 11) value = value.substring(0, 11) + '-' + value.substring(11);
    e.target.value = value.substring(0, 14);
});

document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) value = '(' + value;
    if (value.length > 3) value = value.substring(0, 3) + ')' + value.substring(3);
    if (value.length > 9) value = value.substring(0, 9) + '-' + value.substring(9);
    e.target.value = value.substring(0, 14);
});