const fs = require('fs');
const plays = JSON.parse(fs.readFileSync('./data/plays.json'));

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  getAmount() {
    throw new Error(`subclass responsibility`);
  }

  getVolumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  getAmount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  getAmount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 1000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    return super.getVolumeCredits() + Math.floor(this.performance.audience / 5);
  }
}

function totalVolumeCredits(data) {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function totalAmount(data) {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);

    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
}

function enrichPerformance(aPerformance) {
  const calculator = createPerformanceCalculator(
    aPerformance,
    playFor(aPerformance)
  );
  const result = Object.assign({}, aPerformance);
  result.play = calculator.play;
  result.amount = calculator.getAmount();
  result.volumeCredits = calculator.getVolumeCredits();
  return result;
}

function createStatementData(invoice) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;
}

module.exports = createStatementData;
