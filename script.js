let listagemtelefonica;

async function consulta() {
    listagemtelefonica = '';
    let retorno = await fetch('https://6338cdf8937ea77bfdc41851.mockapi.io/listatelefonica')
    let lista = await retorno.json()
    console.log('lista', lista)
    lista.forEach((i) => {
        console.log(i)
        let avatarLetra = i.nome.charAt(0);
        let codContacts = i.id;
        

        listagemtelefonica += `
        <div class="conteiner">
            <div class="d-flex justify-content-between align-items-center">
            <div class="avatar">${avatarLetra}</div>   
            
            
            <div> 
                <h3>${i.nome}</h3>
                <p>${i.telefone}</p>
                </div>
        
                <div>
                    <button onclick="${Excluir(codContacts)}" type="button" class="btn btn-danger" data-toggle="modal" data-target="#ExemploModalCentralizado">
                    -
                </button>
                </div>
            </div>
        </div>
        `
    });
    contatos.innerHTML = listagemtelefonica;
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

    let enviando = await fetch('https://6338cdf8937ea77bfdc41851.mockapi.io/listatelefonica', enviar)
    consulta();

}

function Excluir(idList) {
    let enviar = {
        method: "DELETE",
        headers: { "content-type": "application/json", }
    }
    fetch(`https://6338cdf8937ea77bfdc41851.mockapi.io/listatelefonica/${idList}`, enviar).then();
}