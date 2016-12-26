export function isFeature(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('Feature');
  new Assertion(obj).to.have.property('geometry').a('Geometry');
  new Assertion(obj).to.have.property('properties').a('object');
}

export function isPoint(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj).to.have.property('coordinates').a('array');
}
