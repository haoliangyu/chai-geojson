import { getTypeAssertFunction } from './assertType';

export default (chai, utils) => {
  let Assertion = chai.Assertion;

  Assertion.overwriteChainableMethod('a', function(_super) {
    return function assertType (type) {
      let assertFunction = getTypeAssertFunction(type);

      if (assertFunction) {
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
