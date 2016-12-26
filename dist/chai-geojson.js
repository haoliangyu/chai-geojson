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

function getTypeAssertFunction(type) {
  if (type === 'FeatureCollection') {
    return isFeatureCollection;
  } else if (type === 'Feature') {
    return isFeature;
  } else if (type === 'Geometry') {
    return isGeometry;
  } else if (type === 'Point') {
    return isPoint$$1;
  } else if (type === 'LineString') {
    return isLineString$$1;
  }
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
