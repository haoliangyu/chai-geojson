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

export function isFeatureCollection(typeAssertion) {
  typeAssertion.assert(
    typeAssertion._obj.type === 'FeatureCollection' && Array.isArray(typeAssertion._obj.features),
    "expected #{this} to be a FeatureCollection",
    "expected #{this} to not be a FeatureCollection"
  );
}

export function isFeature(typeAssertion) {
  typeAssertion.assert(
    typeAssertion._obj.type === 'Feature' &&
    typeof typeAssertion._obj.geometry === 'object' &&
    typeof typeAssertion._obj.properties === 'object',
    "expected #{this} to be a Feature",
    "expected #{this} to not be a Feature"
  );
}

export function isGeometry(typeAssertion) {
  let geometryType = typeAssertion._obj.type;
  let assertFunction = getTypeAssertFunction(geometryType);

  assertFunction(typeAssertion);
}

export function isPoint(typeAssertion) {
  let positiveMsg = 'expected #{this} to be a Point';
  let negativeMsg = 'expected #{this} to not be a Point';

  typeAssertion.assert(
    typeAssertion._obj.type === 'Point' &&
    Array.isArray(typeAssertion._obj.coordinates),
    positiveMsg,
    negativeMsg
  );

  assertCoordArray.isPoint(typeAssertion, positiveMsg, negativeMsg);
}

export function isLineString(typeAssertion) {
  let positiveMsg = 'expected #{this} to be a LineString';
  let negativeMsg = 'expected #{this} to not be a LineString';

  typeAssertion.assert(
    typeAssertion._obj.type === 'LineString' &&
    Array.isArray(typeAssertion._obj.coordinates),
    positiveMsg,
    negativeMsg
  );

  assertCoordArray.isLineString(typeAssertion, positiveMsg, negativeMsg);
}

export function isPolygon(typeAssertion) {
  let positiveMsg = 'expected #{this} to be a Polygon';
  let negativeMsg = 'expected #{this} to not be a Polygon';

  typeAssertion.assert(
    typeAssertion._obj.type === 'Polygon' &&
    Array.isArray(typeAssertion._obj.coordinates),
    positiveMsg,
    negativeMsg
  );

  assertCoordArray.isPolygon(typeAssertion, positiveMsg, negativeMsg);
}

export function isMultiPoint(typeAssertion) {
  let positiveMsg = 'expected #{this} to be a MultiPoint';
  let negativeMsg = 'expected #{this} to not be a MultiPoint';

  typeAssertion.assert(
    typeAssertion._obj.type === 'MultiPoint' &&
    Array.isArray(typeAssertion._obj.coordinates),
    positiveMsg,
    negativeMsg
  );

  assertCoordArray.isLineString(typeAssertion, positiveMsg, negativeMsg);
}

export function isMultiLineString(typeAssertion) {
  let positiveMsg = 'expected #{this} to be a MultiLineString';
  let negativeMsg = 'expected #{this} to not be a MultiLineString';

  typeAssertion.assert(
    typeAssertion._obj.type === 'MultiLineString' &&
    Array.isArray(typeAssertion._obj.coordinates),
    positiveMsg,
    negativeMsg
  );

  assertCoordArray.isPolygon(typeAssertion, positiveMsg, negativeMsg);
}

export function isMultiPolygin(typeAssertion) {
  let positiveMsg = 'expected #{this} to be a MultiPolygon';
  let negativeMsg = 'expected #{this} to not be a MultiPolygon';

  typeAssertion.assert(
    typeAssertion._obj.type === 'MultiPolygon' &&
    Array.isArray(typeAssertion._obj.coordinates),
    positiveMsg,
    negativeMsg
  );

  typeAssertion._obj.coordinates.forEach(polygon => {
    typeAssertion.assert(
      Array.isArray(polygon) && polygon.length > 0,
      positiveMsg,
      negativeMsg
    );

    polygon.forEach(lineString => {
      typeAssertion.assert(
        Array.isArray(lineString) && lineString.length > 1,
        positiveMsg,
        negativeMsg
      );

      lineString.forEach(point => {
        typeAssertion.assert(
          Array.isArray(point) && point.length === 2,
          positiveMsg,
          negativeMsg
        );
      });
    });
  });
}
