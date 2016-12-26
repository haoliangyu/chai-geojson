import * as assertCoordArray from './assertCoordArray';

export function isFeatureCollection(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('FeatureCollection');
  new Assertion(obj).to.have.property('features').a('array');
}

export function isFeature(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('Feature');
  new Assertion(obj).to.have.property('geometry').a('object');
  new Assertion(obj).to.have.property('properties').a('object');
}

export function isGeometry(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');

  let geometryType = obj.type;
  let assertFunction = getTypeAssertFunction(geometryType);

  assertFunction(Assertion, obj);
}

export function isPoint(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('Point');
  new Assertion(obj).to.have.property('coordinates').a('array');

  assertCoordArray.isPoint(Assertion, obj.coordinates);
}

export function isLineString(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('LineString');
  new Assertion(obj).to.have.property('coordinates').a('array');

  assertCoordArray.isLineString(Assertion, obj.coordinates);
}

export function getTypeAssertFunction(type) {
  if (type === 'FeatureCollection') {
    return isFeatureCollection;
  } else if (type === 'Feature') {
    return isFeature;
  } else if (type === 'Geometry') {
    return isGeometry;
  } else if (type === 'Point') {
    return isPoint;
  } else if (type === 'LineString') {
    return isLineString;
  }
}
