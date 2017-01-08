import { getTypeAssertFunction } from './assertType';
import * as assertProperty from './assertProperty';
import * as helper from './helper';

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

    new Assertion(this._obj).to.have.property('type').a('string');
    if (this._obj.type !== 'Feature' && this._obj.type !== 'FeatureCollection') {
      this._obj = helper.feature(this._obj);
    }

    assertProperty.areaEqual(this, value, precision);
  }, function() {
    this.geomArea = true;
  });

  Assertion.addMethod('areaOf', function(value, precision) {
    new Assertion(value).to.be.a('Number').at.least(0);

    precision = precision || 0;
    new Assertion(precision).to.be.a('Number').within(0, 1);

    new Assertion(this._obj).to.have.property('type').a('string');
    if (this._obj.type !== 'Feature' && this._obj.type !== 'FeatureCollection') {
      this._obj = helper.feature(this._obj);
    }

    assertProperty.areaEqual(this, value, precision);
  });

  Assertion.overwriteChainableMethod('length', function(_super) {
    return function assertLength(value, precision) {
      if ('length' in this._obj) {
        _super.apply(this, arguments);
      } else {
        new Assertion(value).to.be.a('Number').at.least(0);

        precision = precision || 0;
        new Assertion(precision).to.be.a('Number').within(0, 1);

        new Assertion(this._obj).to.have.property('type').a('string');
        if (this._obj.type !== 'Feature' && this._obj.type !== 'FeatureCollection') {
          this._obj = helper.feature(this._obj);
        }

        assertProperty.lengthEqual(this, value, precision);
      }
    };
  }, function() {
    return function chainingFunction() {
      this.geomLength = true;
    };
  });

  Assertion.overwriteMethod('lengthOf', function(_super) {
    return function assertPropertyEqual(value, precision) {
      if ('length' in this._obj) {
        _super.apply(this, arguments);
      } else {
        new Assertion(value).to.be.a('Number').at.least(0);

        precision = precision || 0;
        new Assertion(precision).to.be.a('Number').within(0, 1);

        new Assertion(this._obj).to.have.property('type').a('string');
        if (this._obj.type !== 'Feature' && this._obj.type !== 'FeatureCollection') {
          this._obj = helper.feature(this._obj);
        }

        assertProperty.lengthEqual(this, value, precision);
      }
    };
  });

  Assertion.overwriteMethod('above', function(_super) {
    return function assertPropertyEqual (value) {
      if (this.geomArea || this.geomLength) {
        new Assertion(value).to.be.a('Number').at.least(0);

        new Assertion(this._obj).to.have.property('type').a('string');
        if (this._obj.type !== 'Feature' && this._obj.type !== 'FeatureCollection') {
          this._obj = helper.feature(this._obj);
        }

        if (this.geomArea) {
          assertProperty.areaAbove(this, value);
        } else {
          assertProperty.lengthAbove(this, value);
        }
      } else {
        _super.apply(this, arguments);
      }
    };
  });

  Assertion.overwriteMethod('least', function(_super) {
    return function assertPropertyEqual (value) {
      if (this.geomArea || this.geomLength) {
        new Assertion(value).to.be.a('Number').at.least(0);

        new Assertion(this._obj).to.have.property('type').a('string');
        if (this._obj.type !== 'Feature' && this._obj.type !== 'FeatureCollection') {
          this._obj = helper.feature(this._obj);
        }

        if (this.geomArea) {
          assertProperty.areaAtLeast(this, value);
        } else {
          assertProperty.lengthAtLeast(this, value);
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

        new Assertion(this._obj).to.have.property('type').a('string');
        if (this._obj.type !== 'Feature' && this._obj.type !== 'FeatureCollection') {
          this._obj = helper.feature(this._obj);
        }

        if (this.geomArea) {
          assertProperty.areaBelow(this, value);
        } else {
          assertProperty.lengthBelow(this, value);
        }
      } else {
        _super.apply(this, arguments);
      }
    };
  });

  Assertion.overwriteMethod('most', function(_super) {
    return function assertPropertyEqual (value) {
      if (this.geomArea || this.geomLength) {
        new Assertion(value).to.be.a('Number').at.least(0);

        new Assertion(this._obj).to.have.property('type').a('string');
        if (this._obj.type !== 'Feature' && this._obj.type !== 'FeatureCollection') {
          this._obj = helper.feature(this._obj);
        }

        if (this.geomArea) {
          assertProperty.areaAtMost(this, value);
        } else {
          assertProperty.lengthAtMost(this, value);
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

        new Assertion(this._obj).to.have.property('type').a('string');
        if (this._obj.type !== 'Feature' && this._obj.type !== 'FeatureCollection') {
          this._obj = helper.feature(this._obj);
        }

        if (this.geomArea) {
          assertProperty.areaWithin(this, lower, upper);
        } else {
          assertProperty.lengthWithin(this, lower, upper);
        }
      } else {
        _super.apply(this, arguments);
      }
    };
  });

};
