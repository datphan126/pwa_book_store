var jsonData = require('./dist/book-store/ngsw.json');
var fs = require('fs');

console.log("[FIX-SW] Removing index.html from the hashTable in ngsw.json");
console.log("[FIX-SW] This is a workaround for making Service Worker work in offline mode");
var key = "/index.html";
delete jsonData.hashTable[key];

fs.writeFile("./dist/book-store/ngsw.json", JSON.stringify(jsonData), function(err) {
    if (err) {
        console.log(err);
    }
});