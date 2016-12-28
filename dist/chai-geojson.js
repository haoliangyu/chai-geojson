'use strict';

function isPoint$1(assertion, positiveMsg, negativeMsg) {
  assertion.assert(assertion._obj.coordinates.length === 2, positiveMsg, negativeMsg);
}

function isLineString$1(assertion, positiveMsg, negativeMsg) {
  assertion.assert(assertion._obj.coordinates.length > 1, positiveMsg, negativeMsg);

  assertion._obj.coordinates.forEach((function (point) {
    assertion.assert(Array.isArray(point) && point.length === 2, positiveMsg, negativeMsg);
  }));
}

function isPolygon$1(assertion, positiveMsg, negativeMsg) {
  assertion.assert(assertion._obj.coordinates.length > 0, positiveMsg, negativeMsg);

  assertion._obj.coordinates.forEach((function (lineString) {
    assertion.assert(Array.isArray(lineString) && lineString.length > 1, positiveMsg, negativeMsg);

    lineString.forEach((function (point) {
      assertion.assert(Array.isArray(point) && point.length === 2, positiveMsg, negativeMsg);
    }));
  }));
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

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

function isFeatureCollection(typeAssertion) {
  typeAssertion.assert(typeAssertion._obj.type === 'FeatureCollection' && Array.isArray(typeAssertion._obj.features), "expected #{this} to be a FeatureCollection", "expected #{this} to not be a FeatureCollection");
}

function isFeature(typeAssertion) {
  typeAssertion.assert(typeAssertion._obj.type === 'Feature' && _typeof(typeAssertion._obj.geometry) === 'object' && _typeof(typeAssertion._obj.properties) === 'object', "expected #{this} to be a Feature", "expected #{this} to not be a Feature");
}

function isGeometry(typeAssertion) {
  var geometryType = typeAssertion._obj.type;
  var assertFunction = getTypeAssertFunction(geometryType);

  assertFunction(typeAssertion);
}

function isPoint$$1(typeAssertion) {
  var positiveMsg = 'expected #{this} to be a Point';
  var negativeMsg = 'expected #{this} to not be a Point';

  typeAssertion.assert(typeAssertion._obj.type === 'Point' && Array.isArray(typeAssertion._obj.coordinates), positiveMsg, negativeMsg);

  isPoint$1(typeAssertion, positiveMsg, negativeMsg);
}

function isLineString$$1(typeAssertion) {
  var positiveMsg = 'expected #{this} to be a LineString';
  var negativeMsg = 'expected #{this} to not be a LineString';

  typeAssertion.assert(typeAssertion._obj.type === 'LineString' && Array.isArray(typeAssertion._obj.coordinates), positiveMsg, negativeMsg);

  isLineString$1(typeAssertion, positiveMsg, negativeMsg);
}

function isPolygon$$1(typeAssertion) {
  var positiveMsg = 'expected #{this} to be a Polygon';
  var negativeMsg = 'expected #{this} to not be a Polygon';

  typeAssertion.assert(typeAssertion._obj.type === 'Polygon' && Array.isArray(typeAssertion._obj.coordinates), positiveMsg, negativeMsg);

  isPolygon$1(typeAssertion, positiveMsg, negativeMsg);
}

function isMultiPoint(typeAssertion) {
  var positiveMsg = 'expected #{this} to be a MultiPoint';
  var negativeMsg = 'expected #{this} to not be a MultiPoint';

  typeAssertion.assert(typeAssertion._obj.type === 'MultiPoint' && Array.isArray(typeAssertion._obj.coordinates), positiveMsg, negativeMsg);

  isLineString$1(typeAssertion, positiveMsg, negativeMsg);
}

function isMultiLineString(typeAssertion) {
  var positiveMsg = 'expected #{this} to be a MultiLineString';
  var negativeMsg = 'expected #{this} to not be a MultiLineString';

  typeAssertion.assert(typeAssertion._obj.type === 'MultiLineString' && Array.isArray(typeAssertion._obj.coordinates), positiveMsg, negativeMsg);

  isPolygon$1(typeAssertion, positiveMsg, negativeMsg);
}

function isMultiPolygin(typeAssertion) {
  var positiveMsg = 'expected #{this} to be a MultiPolygon';
  var negativeMsg = 'expected #{this} to not be a MultiPolygon';

  typeAssertion.assert(typeAssertion._obj.type === 'MultiPolygon' && Array.isArray(typeAssertion._obj.coordinates), positiveMsg, negativeMsg);

  typeAssertion._obj.coordinates.forEach((function (polygon) {
    typeAssertion.assert(Array.isArray(polygon) && polygon.length > 0, positiveMsg, negativeMsg);

    polygon.forEach((function (lineString) {
      typeAssertion.assert(Array.isArray(lineString) && lineString.length > 1, positiveMsg, negativeMsg);

      lineString.forEach((function (point) {
        typeAssertion.assert(Array.isArray(point) && point.length === 2, positiveMsg, negativeMsg);
      }));
    }));
  }));
}

var index = (function (chai, utils) {
  var Assertion = chai.Assertion;

  Assertion.overwriteChainableMethod('a', (function (_super) {
    return function assertType(type) {
      var assertFunction = getTypeAssertFunction(type);

      if (assertFunction) {
        new Assertion(this._obj).to.have.property('type').a('string');

        var typeAssertion = new Assertion();
        utils.transferFlags(this, typeAssertion);

        assertFunction(typeAssertion);
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
