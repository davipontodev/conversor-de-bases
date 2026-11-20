# Conversor de Bases Numéricas 🔢

**Site no ar:** https://davipontodev.github.io/conversor-de-bases/

Ferramenta web que converte números inteiros entre binário, octal, decimal e hexadecimal e mostra o passo a passo das conversões.

Projeto feito para praticar os conteúdos de **Introdução a Conceitos de Computação**, **Pensamento Computacional** e **Fundamentos de Web** do curso de TI da UFMS.

## Funcionalidades

- **Conversão em tempo real** entre as bases 2, 8, 10 e 16 enquanto o usuário digita.
- **Passo a passo da soma posicional:** mostra como o número vira decimal (ex.: `1×2^5 + 0×2^4 + ...`).
- **Tabela de divisões sucessivas:** mostra cada divisão por 2 e o resto, como é feito no papel.
- **Validação:** avisa quando um dígito não existe na base escolhida (ex.: `2` em binário).
- **Números grandes:** usa `BigInt`, então funciona com valores além do limite normal do JavaScript.
- **Algoritmos próprios:** a conversão é feita "na mão", sem usar `parseInt` ou `toString(base)`.

## Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox e Grid, layout responsivo)
- JavaScript puro (sem frameworks)

## Como funciona

**Qualquer base → decimal:** cada dígito é multiplicado pela base elevada à sua posição, e os resultados são somados.

**Decimal → qualquer base:** o número é dividido pela base várias vezes; os restos, lidos de baixo para cima, formam o resultado.

## Como Executar o Projeto

1. Clone ou baixe este repositório:
   ```bash
   git clone https://github.com/davipontodev/conversor-de-bases.git
   ```
2. Abra o arquivo `index.html` no navegador.
