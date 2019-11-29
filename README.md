# Documentação Dashboard Cedente/Cessionário
-----
### Pré requisito
Antes de começar a rodar o projeto em modo desenvolvimento ou **construir** para produção é necessários a instalação de algumas bibliotecas no seu computador.

[Download NodeJS](https://nodejs.org/en/download/)

[Download Angular CLI](https://cli.angular.io/)


> É extremamente importante primeiro a instalação do nodejs e depois a instalação do angular, sem o node o angular __não poderar__ ser instalado.

-

###Instalação do projeto

Depois de instalado as bibliotecas necessárias basta abrir seu terminal ou prompt de comando e navegar até a pasta onde se encontra seu projeto, na raiz da pasta do seu projeto execulte o seguinte comando:

`npm install`

isso vai fazer com que o node instale todas as bibliotecas do seu projeto, após ser instalado todas as biblioteclas do seu projeto o processo de instalação foi concluido.

> Caso aconteça algum erro no seu projeto verifique com atenção os logs no seu terminal a maioria das vezes pode ser erro de permissão, então volte com permissões de administrador para o seu terminal, no caso do windows execulte o prompt de comando como administrador.

-

### Modo Desenvolvimento
Para construir seu projeto em desenvolvimento e abrir uma porta local não é muito difícil, basta no seu terminal ou prompt de comando navegar até a pasta raiz do seu projeto e execultar o comando:

`npm run hmr`

Ele vai construir o seu projeto com uma porta `localhost:4200` na sua máquina.

-

### Construir para produção

Para construir seu projeto em produção é muito simples, basta você execultar o comando:

`ng build --prod`

Ele ira compilar o seu projeto inteiro para se tornar aquivos `html, css e javascript` fazendo sua aplicação mais leve e mais flúida.

Esses arquivos serão enconstrados dentro da pasta `dist` da sua estrutura de pasta, na raiz do projeto.

![](https://i.ibb.co/Px6Mrrr/estrutura.png)

-

### Arquivo de configuração

O arquivo de configuração ele é um arquivo de gerenciamento de dados importantes do seu projeto, você terar 3 tipos de arquivo de configuração, o `environment.hmr.ts`, `environment.ts` e `environment.prod.ts`. Basicamente você ira apenas mexer no `environment.hmr.ts` ou `environment.prod.ts`, o `environment.hmr.ts` ele irar mexer nas configuração de construções do seu hambiente de **desenvolvimento**, já o `environment.prod.ts` no seu hambiente de **produção**. Ele se encontra em `PASTA RAIZ DO PROJETO > src > environments`.

![](https://i.ibb.co/YNNfsqF/env.png)