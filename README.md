# Projeto
 
![GitHub repo size](https://img.shields.io/github/repo-size/BolsaUFJF/bspr?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/BolsaUFJF/bspr?style=for-the-badge)
 
## 💻 Sobre o projeto
 
Repositório referente ao projeto de Iniciação Científica da Universidade Federal de Juiz de Fora, voltado ao estudo da proveniência de dados em uma rede de Blockchain para dispositivos IIoT.
 ---
 ## Funcionalidades
O sistema possui as seguintes funcionalidades:
* Iniciar uma rede de Blockchain
* Cadastrar usuários nas organizações da rede
* Efetuar o upload de Documentos
* Enviar documentos dentro da rede de Blockchain
* Efetuar a captura de erros através da api: https://github.com/BolsaUFJF/api-provenance
 
<!-- * criar uma rede de Blockchain, utilizando do Hyperledger Fabric
* Executar transações na última rede que está em execução
* Registar dados com o intuito de fazer estudos sobre a proveniência de dados -->
 
 ---

## Instalação

Antes de executar os códigos para poder utilizar o sistema verifique se você possui em sua máquina as dependências necessárias para executar o código.
* NodeJs >= 14.18.1
* Npm >= 6.14.15
* GoLang >= 1.16.4
* Docker >= 20.10.7
* Docker Compose >= 1.28.4
* MongoDB: >= 4.4.10
* Hyperledger Fabric: 2.2.2
 
Para a instalação do Hyperledger Fabric execute o comando a seguir:
 
```console
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.2 1.4.9
```
--- 
## ☕ Executando o código
 
Para executar, siga estas etapas:

* Altere o arquivo *.env.template* para *.env*
* Descompacte o arquivo *rede2.zip* dentro da pasta */networks*

Após os dois passos anteriores execute os comando abaixo:
 
```console
npm install
 
npm start 
```

[⬆ Voltar ao topo](#projeto)<br>

