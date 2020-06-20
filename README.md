
# Covid-19 Graphs

## Informações
**Sobre este projeto:**
- É uma Web Application que fornece dados detalhados sobre todos os registros oficiais de Covid-19 em mais de 180 países. Estes registros inclui Casos confirmados, Recuperados e Mortos.

- Os dados podem ser exibidos com datas especificas variando desde 22/01/2020 até a data do ultimo registro oficial de cada país (geralmente a atualização ocorre diariamente entre as 01:00 e 07:00 da manhã com as informações oficiais do dia anterior).

- Além de poder especificar a data os dados são separados por:
  - **Resumo** (soma de todos os registros até aquela data).
  - **Taxa de crescimento** (de "dia para dia" e de "data inicial para data final").
  - **Número de novos registros** (de "dia para dia" e de "data inicial para data final").
  - **Dia com o maior número de registros** (entre a "data inicial e a data final").
  - **Mapa global** (destacando por cores os países com base na sua quantidade de registros em uma data especifica).
  - **Rank dos países** (com base na quantidade de registros de uma data especifica).
  - **Resumo global** (soma de todos os registros de todos os países até uma data especifica).

- Este projeto não visa somente informar dados, mas também instruir os usuários como agir durante a pandemia por meio dos anúncios oficiais da OMS, e por fim conscientizar as pessoas de que cada um deva fazer a sua parte.

**Front-end:** VueJs.

**Back-end:** NodeJs + Express.

**API Rest:** GraphQL + ApolloGraphQL.

**Outras APIs:** ChartJs, Google Charts, Axios, Bootstrap.

**Pré-processador:** SASS.

**Linter:** ESlint-airbnb (Usado no Front-end).

**Status:** Em andamento (87.3% para v1.0).

**Link:** [http://devontheroad-net.umbler.net/](http://devontheroad-net.umbler.net/).

## Como rodar
**Requisitos:**
- Ter instalado o Node.Js e o NPM [Download](https://nodejs.org/en/download/).

**Download das dependências:**
- Baixe o repositório.

- No repositório local use o comando `npm install` na pasta raiz para fazer o download das dependências do Back-end.

- No repositório local use o comando `npm run client-install` na pasta raiz para fazer o download das dependências do Front-end.

**Como iniciar o Servidor (Back-end)**
- Para iniciar o servidor no **modo "desenvolvedor"** (usando o Nodemon) digite o comando: `npm run server-dev`.

**Como iniciar o Servidor (Front-end)**
- Para iniciar o servidor no **modo "desenvolvedor"** digite no terminal `npm run client-dev`.

**Como iniciar o Servidor no modo "Produção"**
- Para iniciar o servidor no **modo "produção"** digite o comando: `npm start`.
OBS: Para esta etapa é necessário já ter feito o build do Front-end com o comando `npm run client-build`.

## Observações
**Eslint**
- Caso o Eslit apresente algum erro na hora de fazer o Build ou no momento de rodar o Front-end no **modo "Desenvolvedor"** basta usar o comando `npm run client-lint-fix` para que o Eslint concerte os problemas encontrados.