# Projeto
 
![GitHub repo size](https://img.shields.io/github/repo-size/BolsaUFJF/bspr?style=for-the-badge) ![GitHub language count](https://img.shields.io/github/languages/count/BolsaUFJF/bspr?style=for-the-badge)

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NodeJs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
	

## Sobre
Aplicação para testar uma arquitetura BSPR, que consiste no envio de documentos entre empresas utilizando de uma rede blockchain e captura de dados de proveniência.

Projeto desenvolvido durante um projeto de iniciação científica da Universidade Federal de Juiz de Fora.

---

## Funcionalidades
- Inicializar um rede blockchain;
- Cadastrar usuários nas organizações;
- Upload de documentos;
- Envio de documentos em uma rede blockchain
- Captura de proveniência de dados através da *api* [api-provenance](https://github.com/BolsaUFJF/api-provenance) .

---

## Pré-requisitos
Ferramenta | Versão | 
--- | --- 
NodeJS | >= 14.18.1 | 
Npm | >= 6.14.15 | 
GoLang | >= 1.16.4 | 
Docker | >= 20.10.7 | 
Docker Compose | >= 1.28.4 | 
MongoDB | >= 4.4.10 | 
Hyperledger Fabric | = 2.2.2 | 

Para instalar o Hyperledger Fabric na versão correta, execute o comando a seguir após instalar os outros pré-requisitos.
``` shell
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.2 1.4.9
```

---

## Execução
Primeiramente altere o arquivo *.env.template* para *.env*, caso necessario efetue as alterações no arquivo e depois descompacte o arquivo *rede2.zip* dento da pasta */networks*.

Inicialize a *api* [api-provenance](https://github.com/BolsaUFJF/api-provenance).

Após execute os comando a seguir para executar o codigo:
``` shell
npm install
npm start
```

