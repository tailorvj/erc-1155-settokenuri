var fs = require("fs");
var jsonFile = "../build/contracts/EATest3.json";
var parsed = JSON.parse(fs.readFileSync(jsonFile));
var abi = JSON.stringify(parsed.abi);

console.log(abi);
// return abi;
