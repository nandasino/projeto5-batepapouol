let mensagens;
let user;
cadastrarUsuario();
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
            <li class="status">(${mensagens[i].time})<span> ${mensagens[i].from} </span>${mensagens[i].text}</li>
            `
        }
        else if (tipo === "message"){
            addMsg.innerHTML += `
            <li class="texto">(${mensagens[i].time})<span> ${mensagens[i].from}</span> para <span>${mensagens[i].to}</span>: ${mensagens[i].text}</li>`
        }
    }
  }
function cadastrarUsuario(){
  const nome = prompt("seu lindo nome:");
  const novoUsuario ={
    name: nome
  };
  user = novoUsuario;
  const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",novoUsuario);
  promise.then(buscarMensagens);
  promise.catch(alertaErro);
}
function alertaErro(error){
  if(error.response.status === 400){
    alert("Já existe um usuário com esse nome");
    cadastrarUsuario();
  }
}
function enviarMensagem(){
  const texto = document.querySelector("input").value;
  const novaMensagem = {
    from: user.name,
    to: "Todos",
    text: texto,
    type: "message"
  }
  console.log(novaMensagem);
  const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",novaMensagem);
  promise.then(buscarMensagens);
}