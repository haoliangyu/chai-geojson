'use strict';

function isPoint$1(Assertion, coordinates) {
  new Assertion(coordinates).to.have.lengthOf(2);
}

function isLineString$1(Assertion, coordinates) {
  new Assertion(coordinates).to.have.length.above(1);

  coordinates.forEach((function (point) {
    new Assertion(point).to.be.a('array');
    isPoint$1(Assertion, point);
  }));
}

function isPolygon$1(Assertion, coordinates) {
  new Assertion(coordinates).to.have.length.above(0);

  coordinates.forEach((function (lineString) {
    new Assertion(lineString).to.be.a('array');
    isLineString$1(Assertion, lineString);
  }));
}

var typeAssertFunction = {
  FeatureCollection: isFeatureCollection,
  Feature: isFeature,
  Geometry: isGeometry,
  Point: isPoint$$1,
  LineString: isLineString$$1,
  Polygon: isPolygon$$1,
  MultiPoint: isMultiPoint,
  MultiLineString: isMultiLineString,
  MultiPolygon: isMultiPolygin
};

function getTypeAssertFunction(type) {
  return typeAssertFunction[type];
}

function isFeatureCollection(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('FeatureCollection');
  new Assertion(obj).to.have.property('features').a('array');
}

function isFeature(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('Feature');
  new Assertion(obj).to.have.property('geometry').a('object');
  new Assertion(obj).to.have.property('properties').a('object');
}

function isGeometry(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');

  var geometryType = obj.type;
  var assertFunction = getTypeAssertFunction(geometryType);

  assertFunction(Assertion, obj);
}

function isPoint$$1(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('Point');
  new Assertion(obj).to.have.property('coordinates').a('array');

  isPoint$1(Assertion, obj.coordinates);
}

function isLineString$$1(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('LineString');
  new Assertion(obj).to.have.property('coordinates').a('array');

  isLineString$1(Assertion, obj.coordinates);
}

function isPolygon$$1(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('Polygon');
  new Assertion(obj).to.have.property('coordinates').a('array');

  isPolygon$1(Assertion, obj.coordinates);
}

function isMultiPoint(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('MultiPoint');
  new Assertion(obj).to.have.property('coordinates').a('array');

  isLineString$1(Assertion, obj.coordinates);
}

function isMultiLineString(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('MultiLineString');
  new Assertion(obj).to.have.property('coordinates').a('array');

  isPolygon$1(Assertion, obj.coordinates);
}

function isMultiPolygin(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('MultiPolygon');
  new Assertion(obj).to.have.property('coordinates').a('array');

  obj.coordinates.forEach((function (polygon) {
    new Assertion(polygon).to.be.a('array');
    isPolygon$1(Assertion, polygon);
  }));
}

var index = (function (chai, utils) {
  var Assertion = chai.Assertion;

  Assertion.overwriteChainableMethod('a', (function (_super) {
    return function assertType(type) {
      var assertFunction = getTypeAssertFunction(type);

      if (assertFunction) {
        assertFunction(Assertion, this._obj);
      } else {
        _super.apply(this, arguments);
      }
    };
  }), (function (_super) {
    return function chainingFunction() {
      _super.apply(this, arguments);
    };
  }));
});

module.exports = index;
