import * as assertType from './assertType';

export default (chai, utils) => {
  let Assertion = chai.Assertion;

  Assertion.overwriteChainableMethod('a', function(_super) {
    return function assertType (n) {
      let type = utils.getPathValue('type', this._obj);
      let assertFunction;

      if (type === 'Feature') {
        assertFunction = assertType.isFeature;
      } else if (type === 'Point') {
        assertFunction = assertType.isPoint;
      }

      if (type && assertFunction) {
        assertFunction(Assertion, this._obj);
      } else {
        _super.apply(this, arguments);
      }
    };
  }, function(_super) {
    return function chainingFunction() {
      _super.apply(this, arguments);
    }
  });
};
