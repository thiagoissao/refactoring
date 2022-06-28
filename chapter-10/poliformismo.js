// before refactoring

/*

function plumages(birds) {
  return new Map(birds.map(b => [b.name, plumage(b)]));
}

function speeds(birds) {
  return new Map(birds.map(b => [b.name, airSpeedVelicity(b)]));
}

function plumage(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return 'average';

    case 'AfricanSwallow':
      return bird.numberOfCoconuts > 2 ? 'tired' : 'average';

    case 'NorwegianBlueParrot':
      return bird.voltage > 100 ? 'scorched' : 'beatiful';
    default:
      return 'unknown';
  }
}
function airSpeedVelicity(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return 35;

    case 'AfricanSwallow':
      return 40 - 2 * bird.numberOfCoconuts;

    case 'NorwegianBlueParrot':
      return bird.isNailed ? 0 : 10 + bird.voltage / 10;
    default:
      return null;
  }
}

*/

// start refactoring

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    return 'unknown';
  }

  get airSpeedVelicity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  get plumage() {
    return 'average';
  }

  get airSpeedVelicity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return this.numberOfCoconuts > 2 ? 'tired' : 'average';
  }

  get airSpeedVelicity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    this.voltage > 100 ? 'scorched' : 'beatiful';
  }

  get airSpeedVelicity() {
    return this.isNailed ? 0 : 10 + this.voltage / 10;
  }
}
