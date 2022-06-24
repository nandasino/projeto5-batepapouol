let mensagens;
buscarMensagens();
function buscarMensagens() {
    const promessa = axios.get(
      "https://mock-api.driven.com.br/api/v6/uol/messages"
    );
    promessa.then(popularMensagens);
  }
  function popularMensagens(resposta) {
    console.log(resposta);
    if (resposta.status === 200) {
      console.log("Deuuu boooom");
    }
    mensagens= resposta.data;
    console.log(mensagens);
    renderizarMensagens();
  }
  function renderizarMensagens(){
    const addMsg = document.querySelector(".mensagens");
    addMsg.innerHTML = "";

    for (let i=0; i< mensagens.length; i++){
        let tipo = mensagens[i].type;
        console.log(tipo);
        if (tipo === "status"){
            addMsg.innerHTML +=`
            <h1>Aqui vai um status</h1>
            `
        }
        else if (tipo === "message"){
            addMsg.innerHTML += `
            <h1>Aqui vai uma mensagem</h1>            `
        }
    }
  }
