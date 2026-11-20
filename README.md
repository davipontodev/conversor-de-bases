# conversor-de-bases

Site no ar: https://conversor-de-bases-3xta.onrender.com

(está no plano grátis do Render, então se ninguém acessou faz um tempo ele demora uns 50 segundos pra abrir na primeira vez.)

Fiz esse conversor pra treinar o conteúdo de bases numéricas que vi em Introdução a Conceitos de Computação (TI - UFMS) e praticar Python de Algoritmos e Programação.

Ele converte números inteiros entre binário, octal, decimal e hexadecimal e mostra a conta passo a passo, do jeito que a gente faz no caderno.

## O que ele faz

- converte entre binário, octal, decimal e hexadecimal
- mostra a soma posicional (ex.: `1×2^5 + 0×2^4 + ...`) pra chegar no decimal
- mostra a tabela das divisões sucessivas por 2
- avisa quando você digita um dígito que não existe na base (tipo `2` em binário)
- tem 3 links de exemplo pra testar rápido

Fiz as conversões "na mão", sem usar `int(texto, base)`, `bin()` nem `hex()`, porque a ideia era entender o algoritmo.

## Como funciona

- **de qualquer base pra decimal:** cada dígito é multiplicado pela base elevada à posição dele, e soma tudo (função `para_decimal`)
- **de decimal pra outra base:** vai dividindo pela base e guardando o resto. Os restos lidos de baixo pra cima dão o resultado (função `de_decimal`)

Toda a lógica está em Python (`app.py`). Usei o Flask só pra mostrar o resultado numa página. O HTML e o CSS são a parte visual, e não usei JavaScript.

## Tecnologias

- Python
- Flask
- HTML e CSS

## Como rodar

Precisa ter o Python 3 instalado.

```bash
git clone https://github.com/davipontodev/conversor-de-bases.git
cd conversor-de-bases
pip install -r requirements.txt
python app.py
```

Depois é só abrir o endereço que aparece no terminal (normalmente http://127.0.0.1:5000).

## O que quero melhorar

- aceitar números com vírgula (fracionários)
- converter também direto de binário pra hexadecimal
