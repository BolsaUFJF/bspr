const fs = require('fs');
const path = require("path");
const shell = require("shelljs");


async function startNetwork(networkName) {
   const networks = path.resolve("networks", networkName, "chaincode");
	console.log(networks);

	fs.rmSync(networks+"/wallet", { recursive: true, force: true });

	shell.cd(networks);
	shell.exec("./startFabric.sh javascript");

   // await new Promise((resolve, reject) => {
   //    shell.exec('./startFabric.sh javascript ', function(
   //          error,
   //          stdout,
   //          stderr
   //    ) {
   //          console.log('Running Script...');
   //          console.log('stdout: ' + stdout);
   //          console.log('stderr: ' + stderr);
   //          if (error !== null) {
   //             console.log('exec error: ' + error);
   //             // Reject if there is an error:
   //             return reject(error);
   //          }

   //          // Otherwise resolve the promise:
   //          resolve();
   //    });
   // });

	shell.cd(__dirname);
	shell.cd("../..");
}

async function stopNetwork(networkName) {
	const networks = path.resolve("networks", networkName);
	console.log(networks);

	shell.cd(networks);
	shell.exec("./network.sh down");

	shell.cd(__dirname);
	shell.cd("../..");
}

module.exports = {
   startNetwork,
   stopNetwork,
}