const fs = require('fs');
const invoices = JSON.parse(fs.readFileSync('./data/invoices.json'));
const plays = JSON.parse(fs.readFileSync('./data/plays.json'));
const statement = require('./statement');

const result = statement(invoices[0], plays);
console.log(result);
