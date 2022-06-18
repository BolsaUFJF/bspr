window.onload = function start() {
   axios.get('/pro_article/getTransactions')
   .then(function (response) {
       array = response.data
       conteudo = "";
       console.log(array);

       for (let i = 0; i < array.length; i++) {
         conteudo += "<tr>";
             conteudo += "<td>" + i + "</td>";
             conteudo += "<td>" + array[i].Key + "</td>";
             conteudo += "<td>" + array[i].Record.document.name + "</td>";
             conteudo += "<td>" + array[i].Record.document.provType + "</td>";
             conteudo += "<td>" + array[i].Record.requisition + "</td>";
             conteudo += "<td>";
               // conteudo += "<form id='deleteRede' method='POST' action='/user/delete' enctype='application/json'>";
               // conteudo += "<input type='hidden' name='userId' id='userId' value='" + array[i].Key + "'>";
               // conteudo += "<input type='hidden' name='userName' id='userName' value='" + array[i].nome + "'>";
               // conteudo += "<button type='submit'  class='btn btn-link' title='Excluir Usuário' > <i class='color-danger ti-trash' style='font-size: 20px;'></i> </button>";
               // conteudo += "</form>";
            conteudo += "</td>";
         conteudo += "</tr>";

     }

     document.getElementById("tableListUsersList").innerHTML = conteudo;

   })
   .catch(function (error) {
       // handle error
       console.log(error);
   })
   .finally(function () {
       // always executed
   });
}