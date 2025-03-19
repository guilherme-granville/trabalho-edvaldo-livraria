let db = JSON.parse(localStorage.getItem('db')) || { livros: [], autores: [], generos: [] };

if (!db.autores) db.autores = [];
if (!db.generos) db.generos = [];
if (!db.livros) db.livros = [];

function salvarDados() {
    localStorage.setItem('db', JSON.stringify(db));
}

function adicionarAutor() {
    const nome = document.getElementById("autor_nome").value;
    if (!nome) return;
    const id = (db.autores ? db.autores.length : 0) + 1;
    db.autores.push({ id, nome });
    salvarDados();
    listarAutores();
    carregarAutoresDropdown();
    document.getElementById("autor_nome").value = '';
}

function adicionarGenero() {
    const nome = document.getElementById("genero_nome").value;
    if (!nome) return;
    const id = (db.generos ? db.generos.length : 0) + 1;
    db.generos.push({ id, nome });
    salvarDados();
    listarGeneros();
    carregarGenerosDropdown();
    document.getElementById("genero_nome").value = '';
}

function adicionarLivro() {
    const titulo = document.getElementById("livro_titulo").value;
    const data_publicacao = document.getElementById("livro_data_publicacao").value;
    const autor_id = document.getElementById("livro_autor").value;
    const genero_id = document.getElementById("livro_genero").value;
    if (!titulo || !data_publicacao || !autor_id || !genero_id) return;
    const id = (db.livros ? db.livros.length : 0) + 1;
    
    const [year, month, day] = data_publicacao.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    
    db.livros.push({ id, titulo, data_publicacao: formattedDate, autor_id, genero_id });
    salvarDados();
    listarLivros();
    document.getElementById("livro_titulo").value = '';
    document.getElementById("livro_data_publicacao").value = '';
}

function listarLivros() {
    let lista = "";
    (db.livros || []).forEach(l => {
        const autor = db.autores.find(a => a.id == l.autor_id)?.nome || 'Desconhecido';
        const genero = db.generos.find(g => g.id == l.genero_id)?.nome || 'Desconhecido';
        lista += `<li>${l.titulo} - ${l.data_publicacao} - Autor: ${autor} - Gênero: ${genero} <button onclick='excluirLivro(${l.id})'>Excluir</button></li>`;
    });
    document.getElementById("lista_livros").innerHTML = lista;
}

function listarAutores() {
    let lista = "";
    (db.autores || []).forEach(a => {
        lista += `<li>${a.nome} <button onclick='excluirAutor(${a.id})'>Excluir</button></li>`;
    });
    document.getElementById("lista_autores").innerHTML = lista;
}

function listarGeneros() {
    let lista = "";
    (db.generos || []).forEach(g => {
        lista += `<li>${g.nome} <button onclick='excluirGenero(${g.id})'>Excluir</button></li>`;
    });
    document.getElementById("lista_generos").innerHTML = lista;
}

function excluirLivro(id) {
    db.livros = db.livros.filter(l => l.id !== id);
    salvarDados();
    listarLivros();
}

function excluirAutor(id) {
    db.autores = db.autores.filter(a => a.id !== id);
    salvarDados();
    listarAutores();
    carregarAutoresDropdown();
}

function excluirGenero(id) {
    db.generos = db.generos.filter(g => g.id !== id);
    salvarDados();
    listarGeneros();
    carregarGenerosDropdown();
}

function carregarAutoresDropdown() {
    let options = "";
    (db.autores || []).forEach(a => {
        options += `<option value='${a.id}'>${a.nome}</option>`;
    });
    document.getElementById("livro_autor").innerHTML = options;
}

function carregarGenerosDropdown() {
    let options = "";
    (db.generos || []).forEach(g => {
        options += `<option value='${g.id}'>${g.nome}</option>`;
    });
    document.getElementById("livro_genero").innerHTML = options;
}

function toggleVisibility(listId, button) {
    const list = document.getElementById(listId);
    if (list.classList.contains('visible')) {
        list.classList.remove('visible');
        button.classList.remove('rotate');
    } else {
        list.classList.add('visible');
        button.classList.add('rotate');
    }
}

window.onload = function () {
    listarLivros();
    listarAutores();
    listarGeneros();
    carregarAutoresDropdown();
    carregarGenerosDropdown();
};
