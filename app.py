from flask import Flask, render_template, request

app = Flask(__name__)

DIGITOS = "0123456789ABCDEF"
NOMES_BASES = {2: "binário", 8: "octal", 10: "decimal", 16: "hexadecimal"}


def para_decimal(texto, base):
    """Converte um texto em qualquer base para decimal (soma posicional).
    Cada dígito é multiplicado pela base elevada à posição dele."""
    resultado = 0
    for caractere in texto:
        valor = DIGITOS.find(caractere)
        if valor == -1 or valor >= base:
            raise ValueError(f'O dígito "{caractere}" não existe na base {base}.')
        resultado = resultado * base + valor
    return resultado


def de_decimal(numero, base):
    """Converte de decimal para outra base usando divisões sucessivas.
    Devolve o texto convertido e a lista de divisões feitas."""
    if numero == 0:
        return "0", [(0, 0, 0)]

    divisoes = []
    texto = ""
    atual = numero
    while atual > 0:
        quociente = atual // base
        resto = atual % base
        divisoes.append((atual, quociente, resto))
        texto = DIGITOS[resto] + texto
        atual = quociente
    return texto, divisoes


def agrupar_binario(texto):
    """Separa o binário em grupos de 4 bits pra ficar mais fácil de ler."""
    grupos = []
    while texto:
        grupos.insert(0, texto[-4:])
        texto = texto[:-4]
    return " ".join(grupos)


@app.route("/")
def index():
    texto = request.args.get("numero", "").strip().upper().replace(" ", "")
    try:
        base = int(request.args.get("base", "10"))
    except ValueError:
        base = 10
    if base not in NOMES_BASES:
        base = 10

    contexto = {"numero": texto, "base": base, "erro": None, "resultado": None}

    if texto != "":
        try:
            decimal = para_decimal(texto, base)
        except ValueError as e:
            contexto["erro"] = str(e)
        else:
            binario, divisoes = de_decimal(decimal, 2)
            limpo = texto.lstrip("0") or "0"

            if base == 10:
                titulo = "1. Número em decimal"
                formula = f"O número já está em decimal: {decimal}"
            else:
                titulo = f"1. Do {NOMES_BASES[base]} para decimal (soma posicional)"
                termos = []
                for i, caractere in enumerate(limpo):
                    posicao = len(limpo) - 1 - i
                    termos.append(f"{DIGITOS.find(caractere)}×{base}^{posicao}")
                formula = " + ".join(termos) + f" = {decimal}"

            contexto["resultado"] = {
                "binario": agrupar_binario(binario),
                "octal": de_decimal(decimal, 8)[0],
                "decimal": decimal,
                "hexa": de_decimal(decimal, 16)[0],
                "titulo": titulo,
                "formula": formula,
                "divisoes": divisoes[:64],  # limita a tabela pra número muito grande
            }

    return render_template("index.html", **contexto)


if __name__ == "__main__":
    app.run(debug=True)
