let mensagens;
buscarMensagens();
function buscarMensagens() {
    console.log("Ordem de execução: 1 - Mensagens");
    const promessa = axios.get(
      "https://mock-api.driven.com.br/api/v6/uol/messages"
    );
    //Quando essa promessa for resolvida executo o que tá dentro then
    promessa.then(popularMensagens);
  }
  function popularMensagens(resposta) {
    console.log("Ordem de execução: 2 - popularReceitas()");
    console.log(resposta);
  
    //Deu bom na chamada do GET
    if (resposta.status === 200) {
      console.log("Deuuu boooom");
    }
    mensagens= resposta.data;
    console.log(mensagens);
  }
