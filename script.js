let listagemtelefonica;
let codigoNomeEdicao;
var listaBaixada;
let inputPesquisa;
var corAleatoria = 0;
let cores = ["#000000", "#016ecd", "#5ab75c", "#faa632", "#da4f4a"]


if (!localStorage.getItem('logado')) {
    localStorage.setItem('logado', 'nao')
}

function verificandoLogin() {
    if (localStorage.getItem('logado') === 'nao') {
        $("#ModalLogin").modal({
            show: true
        });
    } else {
        consulta()
    }
}

function login() {
    if (loginSenha.value === 'senha') {
        localStorage.setItem('logado', loginUser.value)
        consulta()
        $('#ModalLogin').modal('hide');
        avatarLogin.innerHTML = `${localStorage.getItem('logado')[0].toUpperCase()}`;
        avatarLoginNome.innerHTML = `${localStorage.getItem('logado').toUpperCase()}`;
    } else {
        erroLogin.innerHTML = 'Senha Incorreta, Tente Novamente';
        inputSenhaLogin.style.border = 'red solid 2px';
    }
}

function logout() {
    localStorage.setItem('logado', 'nao')
    contatos.innerHTML = `    <div id="posicionamentoErro">
    <button class="btn ml-2 btn-danger" onclick="location.reload()">Tentar Novamente?</button>
</div>`
    verificandoLogin()
}

avatarLogin.innerHTML = `${localStorage.getItem('logado')[0].toUpperCase()}`;
avatarLoginNome.innerHTML = `${localStorage.getItem('logado').toUpperCase()}`;

inputPesquisa = document.getElementById('pesquisa')
inputPesquisa.addEventListener("keyup", () => {
    pesquisarContato2();
});

function pesquisarContato2() {
    let valor = document.getElementById('pesquisa').value;
    listagemtelefonica = '';
    if (valor) {
        var filtro = listaBaixada.filter(x => x.nome.toUpperCase().indexOf(valor.toUpperCase()) > -1)
        rederizar(filtro)
    } else {
        rederizar(listaBaixada)
    }
}

inputfiltroFavorito = document.getElementById('filtroFavorito')
inputfiltroFavorito.addEventListener("click", () => {
    listagemtelefonica = '';
    if (filtroFavorito.checked) {
        let filtro = listaBaixada.filter(x => x.favorito === true)
        rederizar(filtro)
    } else {
        rederizar(listaBaixada)
    }
});

function alterarOrdem() {
    if (localStorage.getItem('ordem') === "crescente") {
        localStorage.setItem('ordem', 'decrescente')
    } else {
        localStorage.setItem('ordem', 'crescente')
    }
    consulta()
}

if (!localStorage.getItem('ordem')) {
    localStorage.setItem('ordem', 'crescente')
}

async function consulta() {
    listagemtelefonica = '';
    loading.style.display = 'flex';
    let retorno = await fetch('https://6338cdf8937ea77bfdc41851.mockapi.io/listatelefonica')
    let lista = await retorno.json()
    if (localStorage.getItem('ordem') === "crescente") {
        var lista2 = lista.sort((a, b) =>
            a.nome.localeCompare(b.nome))
    } else {
        var lista2 = lista.sort((a, b) =>
            b.nome.localeCompare(a.nome))
    }
    rederizar(lista2);
    listaBaixada = lista2;
}

function rederizar(listaRenderizada) {
    console.log(listaRenderizada.length)
    count.innerHTML=`${listaRenderizada.length}`

    listaRenderizada.forEach((i) => {
        corAleatoria += 1;
        if (corAleatoria > 4) { corAleatoria = 0; }
        let avatarLetra = i.nome.charAt(0);
        let codContacts = i.id;
        let isFavorito = !i.favorito;
        if (i.favorito) {
            var backgroudCard = 'border border-dark bg-warning text-dark rounded';
        }
        listagemtelefonica += `
        <div class="conteiner ${backgroudCard} d-flex justify-content-between align-items-center">
    <div id="nome-avatar">
        <div class="d-flex justify-content-between align-items-center">
            <div class="avatar" style="background-color: ${cores[corAleatoria]} ;">${avatarLetra.toUpperCase()}</div>
            <div class="ml-4">
                <h3 id="contato${codContacts}" value="${i.nome}">${i.nome}</h3>
                <p id="telefone${codContacts}" value="${i.telefone}">${i.telefone}</p>
            </div>
        </div>
    </div>

    <div id="botoes" class="flex-nowrap d-flex">
         <button onclick="favoritar(${codContacts},${isFavorito})" type="button" class="btn border border-dark btn-warning">
         &#9734;
        </button>
        <button type="button" class="btn btn btn-success" onclick="abreModalEdicao(${codContacts})">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="display: inline-block; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path></svg>
            
        </button>
        <button onclick="Excluir(${codContacts})" type="button" class="btn btn-danger">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"></path></svg>
        </button>
    </div>

</div>
        `
    });
    contatos.innerHTML = listagemtelefonica;
    loading.style.display = 'none';
}

async function adicionar() {
    let enviar = {
        method: "POST",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(
            {
                "nome": contato.value,
                "telefone": numero.value,
            }),
    }
    loading.style.display = 'flex';
    let enviando = await fetch('https://6338cdf8937ea77bfdc41851.mockapi.io/listatelefonica', enviar)
    consulta();
}

async function Excluir(idList) {
    let enviar = {
        method: "DELETE",
        headers: { "content-type": "application/json", }
    }
    loading.style.display = 'flex';
    let envio = await fetch(`https://6338cdf8937ea77bfdc41851.mockapi.io/listatelefonica/${idList}`, enviar)

    consulta();
}

async function editar(idList) {
    let enviar = {
        method: "PUT",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(
            {
                "nome": contatoEdicao.value,
                "telefone": numeroEdicao.value,
            })
    }
    $('#ExemploModalCentralizado2').modal('hide');
    loading.style.display = 'flex';
    let envio = await fetch(`https://6338cdf8937ea77bfdc41851.mockapi.io/listatelefonica/${idList}`, enviar);
    consulta();
}

async function favoritar(idList, estado) {
    let enviar = {
        method: "PUT",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(
            {
                "favorito": estado,
            })
    }
    $('#ExemploModalCentralizado2').modal('hide');
    loading.style.display = 'flex';
    let envio = await fetch(`https://6338cdf8937ea77bfdc41851.mockapi.io/listatelefonica/${idList}`, enviar);
    consulta();
}

function abreModalEdicao(idList) {
    $("#ExemploModalCentralizado2").modal({
        show: true
    });

    let NomeEditar = document.getElementById(`contato${idList}`).textContent;
    let NumeroEditar = document.getElementById(`telefone${idList}`).textContent;
    contatoEdicao.value = NomeEditar;
    numeroEdicao.value = NumeroEditar;
    codigoNomeEdicao = idList;
}

inputloginUser = document.getElementById('loginUser')
inputloginUser.addEventListener("keyup", (x) => {
    if (x.key === 'Enter') {
        loginSenha.focus();
    }
});

inputloginSenha = document.getElementById('loginSenha')
inputloginSenha.addEventListener("keyup", (y) => {
    if (y.key === 'Enter') {
        login();
        loginSenha.value = '';
        loginUser.value = '';
    }
});