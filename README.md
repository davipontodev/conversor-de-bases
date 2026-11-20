# conversor-de-bases

Site no ar: https://davipontodev.github.io/conversor-de-bases/

Fiz esse conversor pra treinar o conteúdo de bases numéricas que vi em Introdução a Conceitos de Computação (TI - UFMS) e praticar HTML, CSS e JavaScript de Fundamentos de Web.

Ele converte números inteiros entre binário, octal, decimal e hexadecimal e mostra a conta passo a passo, do jeito que a gente faz no caderno.

## O que ele faz

- converte enquanto você digita
- mostra a soma posicional (ex.: `1×2^5 + 0×2^4 + ...`) pra chegar no decimal
- mostra a tabela das divisões sucessivas por 2
- avisa quando você digita um dígito que não existe na base (tipo `2` em binário)
- tem 3 botões de exemplo pra testar rápido

Fiz as conversões "na mão", sem usar `parseInt` nem `toString(base)`, porque a ideia era entender o algoritmo. Usei `BigInt` pra funcionar com números grandes também.

## Como funciona

- **de qualquer base pra decimal:** cada dígito é multiplicado pela base elevada à posição dele, e soma tudo
- **de decimal pra outra base:** vai dividindo pela base e guardando o resto. Os restos lidos de baixo pra cima dão o resultado

## Tecnologias

- HTML
- CSS
- JavaScript

## Como rodar

É só abrir o link do site ou baixar o repositório e abrir o `index.html` no navegador.

```bash
git clone https://github.com/davipontodev/conversor-de-bases.git
```
