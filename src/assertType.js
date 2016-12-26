import * as assertCoordArray from './assertCoordArray';

const typeAssertFunction = {
  FeatureCollection: isFeatureCollection,
  Feature: isFeature,
  Geometry: isGeometry,
  Point: isPoint,
  LineString: isLineString,
  Polygon: isPolygon,
  MultiPoint: isMultiPoint,
  MultiLineString: isMultiLineString,
  MultiPolygon: isMultiPolygin
};

export function getTypeAssertFunction(type) {
  return typeAssertFunction[type];
}

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

export function isPolygon(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('Polygon');
  new Assertion(obj).to.have.property('coordinates').a('array');

  assertCoordArray.isPolygon(Assertion, obj.coordinates);
}

export function isMultiPoint(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('MultiPoint');
  new Assertion(obj).to.have.property('coordinates').a('array');

  assertCoordArray.isLineString(Assertion, obj.coordinates);
}

export function isMultiLineString(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('MultiLineString');
  new Assertion(obj).to.have.property('coordinates').a('array');

  assertCoordArray.isPolygon(Assertion, obj.coordinates);
}

export function isMultiPolygin(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('MultiPolygon');
  new Assertion(obj).to.have.property('coordinates').a('array');

  obj.coordinates.forEach(polygon => {
    new Assertion(polygon).to.be.a('array');
    assertCoordArray.isPolygon(Assertion, polygon);
  });
}
