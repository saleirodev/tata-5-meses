/* =========================================================
   CONTROLE DAS CENAS
========================================================= */

let cenaAtual = 1;

function irPara(numero) {

    const cenaAnterior =
        document.querySelector(".cena.ativa");

    const proximaCena =
        document.getElementById(`cena${numero}`);

    if (!proximaCena) return;

    if (cenaAnterior) {
        cenaAnterior.classList.remove("ativa");
    }

    // força a animação da nova cena a reiniciar
    void proximaCena.offsetWidth;

    proximaCena.classList.add("ativa");

    cenaAtual = numero;

    atualizarArquivo(numero);

    // garante que a nova cena começa no topo
    window.scrollTo(0, 0);

    iniciarCena(numero);
}


/* =========================================================
   NÚMERO DO ARQUIVO
========================================================= */

function atualizarArquivo(numero) {

    const elemento =
        document.getElementById("numeroArquivo");

    if (!elemento) return;

    elemento.textContent =
        `ARQ. ${String(numero).padStart(3, "0")}`;
}


/* =========================================================
   INICIALIZAÇÃO DA CENA
========================================================= */

function iniciarCena(numero) {

    if (numero === 1) {
        iniciarTextoInicial();
    }

    if (numero === 8) {
        iniciarBusca();
    }
}


/* =========================================================
   TEXTO INICIAL
========================================================= */

const textoAbertura = `
boa noite, Tamyris.

eu sou um projeto feito pelo seu namorado,

João Gabriel... ou "JG".

se tem uma coisa que ele curte,

é lhe impressionar.

mas ultimamente no bolso dele

não cabem muitos mimos.

vida de empreendedor, bb.

mesmo assim,

isso não o impediu de tentar

te fazer se sentir amada.

para dar início,

vamos fazer uma viagem no tempo.

mas existe uma coisa que você precisa saber.

alguns registros foram encontrados.

e você é a única pessoa autorizada

a descobrir o que aconteceu.
`;

let textoInicialIniciado = false;

function iniciarTextoInicial() {

    if (textoInicialIniciado) return;

    textoInicialIniciado = true;

    const elemento =
        document.getElementById("textoInicial");

    if (!elemento) return;

    let indice = 0;

    function escrever() {

        if (indice >= textoAbertura.length) {
            return;
        }

        elemento.textContent +=
            textoAbertura.charAt(indice);

        indice++;

        setTimeout(escrever, 18);
    }

    escrever();
}


/* =========================================================
   SENHA
========================================================= */

function verificarSenha() {

    const campo =
        document.getElementById("senha");

    const mensagem =
        document.getElementById("mensagemSenha");

    if (!campo || !mensagem) return;

    const senha =
        campo.value.trim().toLowerCase();

    if (senha === "pipoca") {

        mensagem.style.color = "#709970";

        mensagem.textContent =
            "> senha aceita. identidade confirmada.";

        campo.disabled = true;

        setTimeout(() => {
            irPara(4);
        }, 1300);

    } else {

        mensagem.style.color = "#a13d3d";

        mensagem.textContent =
            "> senha incorreta. acesso negado.";

        campo.value = "";

        campo.focus();
    }
}


/* =========================================================
   ENTER NA SENHA
========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key !== "Enter") return;

    if (cenaAtual === 3) {
        verificarSenha();
    }

});


/* =========================================================
   BUSCA DA TAMYRIS
========================================================= */

let buscaIniciada = false;

function iniciarBusca() {

    if (buscaIniciada) return;

    buscaIniciada = true;

    const texto =
        document.getElementById("textoBusca");

    const barra =
        document.getElementById("progressoBusca");

    const resultado =
        document.getElementById("resultadoBusca");

    if (!texto || !barra || !resultado) return;

    const etapas = [

        "> procurando registros...",

        "> analisando informações...",

        "> cruzando registros...",

        "> verificando correspondências...",

        "> acesso ao banco de dados antigo...",

        "> correspondência encontrada."
    ];

    let etapa = 0;

    function executarBusca() {

        if (etapa >= etapas.length) {

            barra.style.width = "100%";

            resultado.style.display = "block";

            return;
        }

        texto.textContent =
            etapas[etapa];

        barra.style.width =
            `${((etapa + 1) / etapas.length) * 100}%`;

        etapa++;

        setTimeout(
            executarBusca,
            850
        );
    }

    executarBusca();
}


/* =========================================================
   CONVITE
========================================================= */

let recusas = 0;

function aceitarConvite() {

    const mensagem =
        document.getElementById("mensagemConvite");

    if (mensagem) {

        mensagem.style.color = "#709970";

        mensagem.textContent =
            "> resposta aceita. encontro registrado.";
    }

    setTimeout(() => {

        irPara(16);

    }, 1200);
}


/* =========================================================
   BOTÃO NÃO
========================================================= */

function recusarConvite() {

    const mensagem =
        document.getElementById("mensagemConvite");

    const botao =
        document.getElementById("botaoNao");

    recusas++;

    const mensagens = [

        "resposta recusada pelo sistema.",

        "tem certeza disso?",

        "essa opção parece suspeita.",

        "vamos tentar novamente.",

        "Tamyris, pense bem.",

        "você realmente achou que eu deixaria?",

        "opção 'não' ficando cada vez menos disponível."
    ];

    if (mensagem) {

        mensagem.textContent =
            `> ${
                mensagens[
                    Math.min(
                        recusas - 1,
                        mensagens.length - 1
                    )
                ]
            }`;
    }

    if (!botao) return;

    if (recusas >= 3) {

        const area =
            document.querySelector(".botoes-convite");

        if (!area) return;

        const largura =
            Math.max(
                0,
                area.clientWidth -
                botao.offsetWidth
            );

        const deslocamento =
            Math.random() * largura;

        botao.style.transform =
            `translateX(${
                deslocamento - largura / 2
            }px)`;
    }

    if (recusas >= 7) {

        botao.textContent =
            "NÃO DISPONÍVEL";

        botao.disabled = true;

        if (mensagem) {

            mensagem.textContent =
                "> sistema decidiu por você.";
        }
    }
}


/* =========================================================
   INÍCIO DO SISTEMA
========================================================= */

window.addEventListener("load", function() {

    atualizarArquivo(1);

    const cenaInicial =
        document.getElementById("cena1");

    if (cenaInicial) {

        cenaInicial.classList.add("ativa");

        iniciarCena(1);
    }

    window.scrollTo(0, 0);
});