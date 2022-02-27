const fs = require('fs');
const invoices = JSON.parse(fs.readFileSync('./data/invoices.json'));
const statement = require('./statement');

const result = statement(invoices[0]);
console.log(result);
