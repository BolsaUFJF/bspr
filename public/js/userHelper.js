window.onload = function start() {
    Org1();
    Org2();
}

function Org1() {
    axios.get('/user/getUsers')
    .then(function (response) {
        users = response.data
        conteudo = "";
        console.log(users);
 
        for (let i = 0; i < users.length; i++) {
          conteudo += "<tr>";
              conteudo += "<td>" + i + "</td>";
              conteudo += "<td>" + users[i].nome + "</td>";
              conteudo += "<td>" + users[i].descricao + "</td>";
              conteudo += "<td>" + users[i].permissao + "</td>";
              conteudo += "<td>" + users[i].pki + "</td>";
              conteudo += "<td>";
                conteudo += "<form id='deleteRede' method='POST' action='/user/delete' enctype='application/json'>";
                conteudo += "<input type='hidden' name='userId' id='userId' value='" + users[i]._id + "'>";
                conteudo += "<input type='hidden' name='userName' id='userName' value='" + users[i].nome + "'>";
                conteudo += "<button type='submit'  class='btn btn-link' title='Excluir Usuário' > <i class='color-danger ti-trash' style='font-size: 20px;'></i> </button>";
                conteudo += "</form>";
                //conteudo += "<a href='/network/routeDeleteNetwork' data-idRede='" + users[i]._id + "' data-nomeRede='" + users[i].nomeRede + "'> <i class='color-danger ti-trash'></i> </a>";
             conteudo += "</td>";
          conteudo += "</tr>";
 
      }
 
      document.getElementById("tableListUsersListOrg1").innerHTML = conteudo;
 
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
}

function Org2() {
    axios.get('/company/getUsers')
    .then(function (response) {
        users = response.data
        conteudo = "";
        console.log(users);
 
        for (let i = 0; i < users.length; i++) {
          conteudo += "<tr>";
              conteudo += "<td>" + i + "</td>";
              conteudo += "<td>" + users[i].nome + "</td>";
              conteudo += "<td>" + users[i].descricao + "</td>";
              conteudo += "<td>" + users[i].permissao + "</td>";
              conteudo += "<td>" + users[i].pki + "</td>";
              conteudo += "<td>";
                conteudo += "<form id='deleteRede' method='POST' action='/user/delete' enctype='application/json'>";
                conteudo += "<input type='hidden' name='userId' id='userId' value='" + users[i]._id + "'>";
                conteudo += "<input type='hidden' name='userName' id='userName' value='" + users[i].nome + "'>";
                conteudo += "<button type='submit'  class='btn btn-link' title='Excluir Usuário' > <i class='color-danger ti-trash' style='font-size: 20px;'></i> </button>";
                conteudo += "</form>";
                //conteudo += "<a href='/network/routeDeleteNetwork' data-idRede='" + users[i]._id + "' data-nomeRede='" + users[i].nomeRede + "'> <i class='color-danger ti-trash'></i> </a>";
             conteudo += "</td>";
          conteudo += "</tr>";
 
      }
 
      document.getElementById("tableListUsersListOrg2").innerHTML = conteudo;
 
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
}