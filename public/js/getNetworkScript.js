$(document).on('click', '.startNetwork', function () { 
    
    var _idNetwork = $(this).data('_idrede');

    var networkName = document.getElementById('networkName').value

    axios.get('/network/start/' + networkName)
    .then(function (response) {
        console.log(response.data)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
});

$(document).on('click', '.stopNetwork', function () { 
    
    var networkName = document.getElementById('networkName').value

    axios.get('/network/stop/' + networkName)
    .then(function (response) {
        console.log(response.data)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
});

$(document).on('click', '.enrollAdmin', function () { 
    
    var networkName = document.getElementById('networkName').value

    axios.get('/network/enrollAdmin/')
    .then(function (response) {
        console.log(response.data)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
});