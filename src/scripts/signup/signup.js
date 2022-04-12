/* Variáveis globais ao escopo do JS */
let API_URL = 'https://ctd-todo-api.herokuapp.com';

//Captura as entradas de dados e ações do usuário na página de cadastro
let campoNomeCadastro = document.getElementById("inputNomeCadastro");
let campoSobrenomeCadastro = document.getElementById("inputSobrenomeCadastro");
let campoEmailCadastro = document.getElementById("inputEmailCadastro");
let campoSenhaCadastro = document.getElementById("inputSenhaCadastro");
let campoRepetirSenhaCadastro = document.getElementById("inputRepetirSenhaCadastro");

let botaoCriarConta = document.getElementById("botaoCriarContaCadastro");

const usuarioObjetoCadastro = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

botaoCriarConta.addEventListener('click', evento => {
    evento.preventDefault();

    //Faz as normalizações e validações

    //Verifica se todos os campos estão preenchidos
    if (campoNomeCadastro.value != "" && campoSenhaCadastro.value != "" &&
        campoEmailCadastro.value != "" && campoSenhaCadastro.value != "" &&
        campoRepetirSenhaCadastro.value != "") {

        //Coloca as informações da tela no objeto
        usuarioObjetoCadastro.firstName = campoNomeCadastro.value;
        usuarioObjetoCadastro.lastName = campoSobrenomeCadastro.value;
        usuarioObjetoCadastro.email = campoEmailCadastro.value;
        usuarioObjetoCadastro.password = campoSenhaCadastro.value;

        let objetoUsuarioCadastroJson = JSON.stringify(usuarioObjetoCadastro);

        let configuracaoPOST = {
            method: 'POST',
            body: objetoUsuarioCadastroJson,
            headers: {
                'Content-type': 'application/json',
            },
        };

        //Chamando a API
        fetch(`${API_URL}/v1/users`, configuracaoPOST)
            .then((respostaDoServidor) => {
                return respostaDoServidor.json();
                })
            .then((respostaEmJSON) => {
                cadastroSucesso(respostaEmJSON.jwt);
            })
            .catch(error => {
                cadastroErro(error);
            });
    } else {
        alert("Todos os campos devem ser preenchidos para que possa prosseguir")
    }
});

/*  Ao obter o sucesso, recebe o json (token) do usuário*/
function cadastroSucesso(jsonRecebido) {
    console.log("Json recebido ao cadastrar");
    console.log(jsonRecebido);
    alert("Usuário cadastrado com sucesso")
    window.location = "index.html"
}

function cadastroErro(statusRecebido) {
    console.log("Erro ao cadastrar");
    console.log(statusRecebido);
}