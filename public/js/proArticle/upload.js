window.onload = function start(){
   axios.get('/user/getUsers').then(function (response) {
      var users = response.data;

      var select = document.getElementById("userPki");

      for (var i = 0; i < users.length; i++) {
         var option = document.createElement("option");
         option.value = users[i]['pki'];
         option.text = users[i]['username'];
         option.selected = true;
         select.appendChild(option);
     }
   });
}