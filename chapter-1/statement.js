const createStatementData = require('./createStatementData');

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber);
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>`;
  result += '<table>\n';
  result += '<tr><th>play</th></tr><th>seats</th><th>cost</th></tr>';
  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td></tr><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += '</table>\n';
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${usd(
    data.totalVolumeCredits
  )}</em>credits</p>\n`;
  return result;
}

function htmlStatement(invoice) {
  return renderHtml(createStatementData(invoice));
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // exibe a linha para esta requisição
    result += `${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function statement(invoice) {
  return renderPlainText(createStatementData(invoice));
}

module.exports = statement;
