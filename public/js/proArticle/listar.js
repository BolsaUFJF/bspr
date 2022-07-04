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
             conteudo += "<td>" + array[i].Record.userSender + "</td>";
             conteudo += "<td>" + array[i].Record.userReciver + "</td>";
             conteudo += "<td>" + array[i].Record.requisition + "</td>";
             conteudo += "<td>";
                conteudo += "<a class='infoTransaction' title = 'Info Transaction' href='javascript:void(0)' data-_idtransaction='" + i + "'><i class='color-info ti-info-alt' style='font-size: 20px;'></i></a>";
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

$(document).on('click', '.infoTransaction', function () {
    var _idTransaction = $(this).data('_idtransaction');
    data = array[_idTransaction].Record.document
    conteudo = "";

    conteudo += "<tr>";
        conteudo += "<td>" + data.name + "</td>";
        conteudo += "<td>" + data.data.mime + "</td>";
        // conteudo += "<td style='word-wrap: break-all'>" + data.data.base + "</td>";
        conteudo += "<td>";
            conteudo += "<a class='closeInfo' title='Voltar' href='javascript:void(0)'> <i class='ti-arrow-circle-left' style='font-size: 20px;'></i> </a>";
        conteudo += "</td>";

    conteudo += "</tr>";

    document.getElementById("transactionInfo").innerHTML = conteudo;

    document.getElementById('tableTransactionInfo').hidden = false
    // document.getElementById('divRedeInfo').hidden = false
    document.getElementById('tableListTransactions').hidden = true
})

$(document).on('click', '.closeInfo', function () { 
    document.getElementById('tableTransactionInfo').hidden = true
    // document.getElementById('divRedeInfo').hidden = true
    document.getElementById('tableListTransactions').hidden = false

});