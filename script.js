let mensagens;
let nome;
let novoUsuario;
cadastrarUsuario();

function buscarMensagens() {
    const promessa = axios.get(
      "https://mock-api.driven.com.br/api/v6/uol/messages"
    );
    promessa.then(popularMensagens);
  }
  function popularMensagens(resposta) {
    console.log(resposta);
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
        else if (tipo === "private_message" && mensagens[i].to === nome){
          addMsg.innerHTML += `
          <li class="privada">(${mensagens[i].time})<span> ${mensagens[i].from}</span> para <span>${mensagens[i].to}</span>: ${mensagens[i].text}</li>`
      }
    }
  const ultimaMensagem = document.querySelector(".mensagens").lastElementChild;
  ultimaMensagem.scrollIntoView();
  }
function cadastrarUsuario(){
  nome = prompt("seu lindo nome:");
  novoUsuario ={
    name: nome
  };
  const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",novoUsuario);
  promise.then(buscarMensagens);
  promise.then(manterConexao);
  promise.catch(alertaErro);
}
function alertaErro(error){
  if(error.response.status === 400){

    alert("Já existe um usuário com esse nome");
    cadastrarUsuario();
  }
}
function online(){
  const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', novoUsuario);
}
function manterConexao(){
  setInterval(online, 5000);
  setInterval(buscarMensagens,3000);
}
function enviarMensagem(){
  const texto = document.querySelector("input").value;
  const novaMensagem = {
    from: nome,
    to: "Todos",
    text: texto,
    type: "message"
  }
  console.log(novaMensagem);
  const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem);
  promise.then(buscarMensagens);
  promise.then(limparInput);
  promise.catch(reiniciaPagina);
}
function reiniciaPagina(error){
  window.location.reload();
}
function limparInput(){
  document.querySelector('input').value = "";
}