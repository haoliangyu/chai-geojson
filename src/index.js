import { getTypeAssertFunction } from './assertType';
import * as assertProperty from './assertProperty';

export default (chai, utils) => {
  let Assertion = chai.Assertion;

  Assertion.overwriteChainableMethod('a', function(_super) {
    return function assertType (type) {
      let assertFunction = getTypeAssertFunction(type);

      if (assertFunction) {
        new Assertion(this._obj).to.have.property('type').a('string');

        assertFunction(this);
      } else {
        _super.apply(this, arguments);
      }
    };
  }, function(_super) {
    return function chainingFunction() {
      _super.apply(this, arguments);
    };
  });

  Assertion.addChainableMethod('area', function(value, precision) {
    new Assertion(value).to.be.a('Number').at.least(0);

    precision = precision || 0;
    new Assertion(precision).to.be.a('Number').within(0, 1);

    assertProperty.areaEquals(this, value, precision);
  }, function() {
    this.geomArea = true;
  });

  Assertion.addMethod('areaOf', function(value, precision) {
    new Assertion(value).to.be.a('Number').at.least(0);

    precision = precision || 0;
    new Assertion(precision).to.be.a('Number').within(0, 1);

    assertProperty.areaEquals(this, value, precision);
  });

  Assertion.overwriteMethod('above', function(_super) {
    return function assertPropertyEqual (value) {
      if (this.geomArea || this.geomLength) {
        new Assertion(value).to.be.a('Number').at.least(0);

        if (this.geomArea) {
          assertProperty.areaAbove(this, value);
        }
      } else {
        _super.apply(this, arguments);
      }
    };
  });

  Assertion.overwriteMethod('below', function(_super) {
    return function assertPropertyEqual (value) {
      if (this.geomArea || this.geomLength) {
        new Assertion(value).to.be.a('Number').at.least(0);

        if (this.geomArea) {
          assertProperty.areaBelow(this, value);
        }
      } else {
        _super.apply(this, arguments);
      }
    };
  });

  Assertion.overwriteMethod('within', function(_super) {
    return function assertPropertyEqual(lower, upper) {
      if (this.geomArea || this.geomLength) {
        new Assertion(lower).to.be.a('Number').at.least(0);
        new Assertion(upper).to.be.a('Number').at.least(upper);

        if (this.geomArea) {
          assertProperty.areaWithin(this, lower, upper);
        }
      } else {
        _super.apply(this, arguments);
      }
    };
  });

};
