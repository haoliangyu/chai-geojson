'use strict';

function isFeature(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj.type).to.equal('Feature');
  new Assertion(obj).to.have.property('geometry').a('Geometry');
  new Assertion(obj).to.have.property('properties').a('object');
}

function isPoint(Assertion, obj) {
  new Assertion(obj).to.have.property('type').a('string');
  new Assertion(obj).to.have.property('coordinates').a('array');
}

var assertType = Object.freeze({
	isFeature: isFeature,
	isPoint: isPoint
});

var index = (function (chai, utils) {
  var Assertion = chai.Assertion;

  Assertion.overwriteChainableMethod('a', (function (_super) {
    return function assertType(n) {
      var type = utils.getPathValue('type', this._obj);
      var assertFunction = void 0;

      if (type === 'Feature') {
        assertFunction = isFeature;
      } else if (type === 'Point') {
        assertFunction = isPoint;
      }

      if (type && assertFunction) {
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
