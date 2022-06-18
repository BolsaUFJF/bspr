$(document).on('click', '.startNetwork', async function () { 
    // loadAnimation();
    
    var _idNetwork = $(this).data('_idrede');

    var networkName = document.getElementById('networkName').value

    // await axios.get('/network/start/' + networkName)
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     // handle error
    //     console.log(error);
    // })
    // .finally(function () {
    //     stopAimation();
    // });

    // try {
    //     const resp = await axios.get('/network/start/' + networkName);
    //     console.log(resp);
    //     stopAimation();
    // } catch (e) {
    //     console.error(e);
    // }
});

$(document).on('click', '.stopNetwork', function () { 

    // loadAnimation();
    
    var networkName = document.getElementById('networkName').value

    axios.get('/network/stop/' + networkName)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // stopAimation();
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


function loadAnimation() {
    document.getElementById("loading-animation").hidden = false;
    document.getElementById("form-load").hidden = true;
}

function stopAimation() {
    document.getElementById("loading-animation").hidden = true;
    document.getElementById("form-load").hidden = false;
}