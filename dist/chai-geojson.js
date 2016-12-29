'use strict';

function isPoint$1(assertion, options) {

  options = options || {};

  var coordinates = options.coordinates ? options.coordinates : assertion._obj.coordinates;
  var negativeMsg = options.negativeMsg ? options.negativeMsg : 'Expect coordinates not to be valid point coordinates';
  var positiveMsg = options.positiveMsg ? options.positiveMsg : 'Expect [' + coordinates + '] to be valid point coordinates';

  assertion.assert(coordinates.length === 2 && typeof coordinates[0] === 'number' && !Number.isNaN(coordinates[0]) && typeof coordinates[1] === 'number' && !Number.isNaN(coordinates[1]), positiveMsg, negativeMsg);
}

function isLineString$1(assertion, options) {

  options = options || {};

  var negativeMsg = options.negativeMsg ? options.negativeMsg : 'Expect coordinates not to be valid linestring coordinates';
  var coordinates = options.coordinates ? options.coordinates : assertion._obj.coordinates;

  assertion.assert(coordinates.length > 1, options.positiveMsg ? options.positiveMsg : 'Expect coordinates to have at least two points', negativeMsg);

  coordinates.forEach((function (point) {
    isPoint$1(assertion, {
      coordinates: point,
      negativeMsg: negativeMsg
    });
  }));
}

function isPolygon$1(assertion, options) {

  options = options || {};

  var negativeMsg = options.negativeMsg ? options.negativeMsg : 'Expect coordinates not to be valid polygon coordinates';
  var coordinates = options.coordinates ? options.coordinates : assertion._obj.coordinates;

  assertion.assert(coordinates.length > 0, options.positiveMsg ? options.positiveMsg : 'Expect coordinates to have at least one ring', negativeMsg);

  coordinates.forEach((function (lineString, index) {
    isLineString$1(assertion, {
      coordinates: lineString,
      positiveMsg: 'Expect ring ' + (index + 1) + ' to be valid linestring coordinates',
      negativeMsg: negativeMsg
    });
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

  isPoint$1(typeAssertion);
}

function isLineString$$1(typeAssertion) {
  var positiveMsg = 'expected #{this} to be a LineString';
  var negativeMsg = 'expected #{this} to not be a LineString';

  typeAssertion.assert(typeAssertion._obj.type === 'LineString' && Array.isArray(typeAssertion._obj.coordinates), positiveMsg, negativeMsg);

  isLineString$1(typeAssertion);
}

function isPolygon$$1(typeAssertion) {
  var positiveMsg = 'expected #{this} to be a Polygon';
  var negativeMsg = 'expected #{this} to not be a Polygon';

  typeAssertion.assert(typeAssertion._obj.type === 'Polygon' && Array.isArray(typeAssertion._obj.coordinates), positiveMsg, negativeMsg);

  isPolygon$1(typeAssertion);
}

function isMultiPoint(typeAssertion) {
  var positiveMsg = 'expected #{this} to be a MultiPoint';
  var negativeMsg = 'expected #{this} to not be a MultiPoint';

  typeAssertion.assert(typeAssertion._obj.type === 'MultiPoint' && Array.isArray(typeAssertion._obj.coordinates), positiveMsg, negativeMsg);

  typeAssertion._obj.coordinates.forEach((function (point, index) {
    isPoint$1(typeAssertion, {
      coordinates: point,
      positiveMsg: 'Expect point ' + (index + 1) + ' to be valid point coordinates'
    });
  }));
}

function isMultiLineString(typeAssertion) {
  var positiveMsg = 'expected #{this} to be a MultiLineString';
  var negativeMsg = 'expected #{this} to not be a MultiLineString';

  typeAssertion.assert(typeAssertion._obj.type === 'MultiLineString' && Array.isArray(typeAssertion._obj.coordinates), positiveMsg, negativeMsg);

  typeAssertion._obj.coordinates.forEach((function (lineString, index) {
    isLineString$1(typeAssertion, {
      coordinates: lineString,
      positiveMsg: 'Expect linestring ' + (index + 1) + ' to be valid linestring coordinates'
    });
  }));
}

function isMultiPolygin(typeAssertion) {
  var positiveMsg = 'expected #{this} to be a MultiPolygon';
  var negativeMsg = 'expected #{this} to not be a MultiPolygon';

  typeAssertion.assert(typeAssertion._obj.type === 'MultiPolygon' && Array.isArray(typeAssertion._obj.coordinates), positiveMsg, negativeMsg);

  typeAssertion._obj.coordinates.forEach((function (polygon, index) {
    isPolygon$1(typeAssertion, {
      coordinates: polygon,
      positiveMsg: 'Expect polygon ' + (index + 1) + ' to be valid polygon coordinates'
    });
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
