const DIGITOS = "0123456789ABCDEF";
const NOMES_BASES = { 2: "binário", 8: "octal", 10: "decimal", 16: "hexadecimal" };

const campoNumero = document.getElementById("numero");
const campoBase = document.getElementById("base");
const erro = document.getElementById("erro");
const passos = document.getElementById("passos");

// Converte um texto em uma base qualquer para decimal usando a soma posicional:
// cada dígito é multiplicado pela base elevada à sua posição.
function paraDecimal(texto, base) {
    let resultado = 0n;
    const baseGrande = BigInt(base);

    for (const caractere of texto) {
        const valor = DIGITOS.indexOf(caractere);
        if (valor === -1 || valor >= base) {
            throw new Error(`O dígito "${caractere}" não existe na base ${base}.`);
        }
        resultado = resultado * baseGrande + BigInt(valor);
    }
    return resultado;
}

// Converte de decimal para outra base com divisões sucessivas.
// Retorna o número convertido e a lista de divisões feitas.
function deDecimal(numero, base) {
    if (numero === 0n) {
        return { texto: "0", divisoes: [{ dividendo: 0n, quociente: 0n, resto: 0n }] };
    }

    const baseGrande = BigInt(base);
    const divisoes = [];
    let texto = "";
    let atual = numero;

    while (atual > 0n) {
        const quociente = atual / baseGrande;
        const resto = atual % baseGrande;
        divisoes.push({ dividendo: atual, quociente, resto });
        texto = DIGITOS[Number(resto)] + texto;
        atual = quociente;
    }
    return { texto, divisoes };
}

function agruparBinario(texto) {
    // Separa o binário em grupos de 4 bits para facilitar a leitura
    return texto.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
}

function mostrarPassos(texto, base, decimal, divisoes) {
    document.getElementById("titulo-para-decimal").textContent =
        `1. Do ${NOMES_BASES[base]} para decimal (soma posicional)`;

    if (base === 10) {
        document.getElementById("para-decimal").textContent = `O número já está em decimal: ${decimal}`;
    } else {
        const termos = [...texto].map((caractere, i) => {
            const posicao = texto.length - 1 - i;
            return `${DIGITOS.indexOf(caractere)}×${base}^${posicao}`;
        });
        document.getElementById("para-decimal").textContent = `${termos.join(" + ")} = ${decimal}`;
    }

    const corpo = document.getElementById("divisoes");
    corpo.innerHTML = "";
    // Limita a tabela para números muito grandes não travarem a página
    for (const d of divisoes.slice(0, 64)) {
        const linha = document.createElement("tr");
        linha.innerHTML = `<td>${d.dividendo}</td><td>${d.quociente}</td><td><strong>${d.resto}</strong></td>`;
        corpo.appendChild(linha);
    }
    passos.hidden = false;
}

function limparResultados() {
    for (const base of [2, 8, 10, 16]) {
        document.getElementById(`r${base}`).textContent = "—";
    }
    passos.hidden = true;
}

function converter() {
    erro.textContent = "";
    const texto = campoNumero.value.trim().toUpperCase().replace(/\s/g, "");
    const base = Number(campoBase.value);

    if (texto === "") {
        limparResultados();
        return;
    }

    let decimal;
    try {
        decimal = paraDecimal(texto, base);
    } catch (e) {
        erro.textContent = e.message;
        limparResultados();
        return;
    }

    const binario = deDecimal(decimal, 2);
    document.getElementById("r2").textContent = agruparBinario(binario.texto);
    document.getElementById("r8").textContent = deDecimal(decimal, 8).texto;
    document.getElementById("r10").textContent = decimal.toString();
    document.getElementById("r16").textContent = deDecimal(decimal, 16).texto;

    mostrarPassos(texto.replace(/^0+(?=.)/, ""), base, decimal, binario.divisoes);
}

campoNumero.addEventListener("input", converter);
campoBase.addEventListener("change", converter);

for (const botao of document.querySelectorAll(".exemplos button")) {
    botao.addEventListener("click", () => {
        campoNumero.value = botao.dataset.valor;
        campoBase.value = botao.dataset.base;
        converter();
    });
}
