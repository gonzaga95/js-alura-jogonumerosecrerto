let listaNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroSecreto();

function alterarDocumentoTexto(tag, texto) {
    let alteracao = document.querySelector(tag);
    alteracao.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function exibirMensagemInicial() {
    alterarDocumentoTexto("h1", "O jogo do número secreto");
    alterarDocumentoTexto("p", `Escolha um número entre 1 e ${numeroMaximo}`);
}

exibirMensagemInicial();

let tentativas = 1;

function verificarChute() {
    let numeroInserido = document.querySelector("input").value;

    if (numeroInserido == numeroSecreto) {
        alterarDocumentoTexto("h1", "Parabéns!");

        let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
        let fraseAcerto = `Você acertou o número secreto em ${tentativas} ${palavraTentativas}`;
        alterarDocumentoTexto("p", fraseAcerto);

        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (numeroInserido > numeroSecreto) {
            alterarDocumentoTexto("h1", "Tente novamente");
            alterarDocumentoTexto("p", "O número secreto é menor");
        } else {
            alterarDocumentoTexto("h1", "Tente novamente");
            alterarDocumentoTexto("p", "O número secreto é maior");
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroSecreto() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    if (listaNumerosSorteados.length == numeroMaximo) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let campoPreenchido = document.querySelector("input");
    campoPreenchido.value = "";
}

function reiniciarJogo() {
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
