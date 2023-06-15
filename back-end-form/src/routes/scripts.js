var fs = require('fs');
let result = []
for(let i=0; i<100000; i++){
    result.push({ fieldKey: "invoiceValue"+i, type: "textfield", fieldName: "Invoice value" + " " + i })
}
// console.log(result)
fs.writeFile("scripts1.js", JSON.stringify(result), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
    }
  });