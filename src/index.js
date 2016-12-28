import { getTypeAssertFunction } from './assertType';

export default (chai, utils) => {
  let Assertion = chai.Assertion;

  Assertion.overwriteChainableMethod('a', function(_super) {
    return function assertType (type) {
      let assertFunction = getTypeAssertFunction(type);

      if (assertFunction) {
        new Assertion(this._obj).to.have.property('type').a('string');

        let typeAssertion = new Assertion();
        utils.transferFlags(this, typeAssertion);

        assertFunction(typeAssertion);
      } else {
        _super.apply(this, arguments);
      }
    };
  }, function(_super) {
    return function chainingFunction() {
      _super.apply(this, arguments);
    };
  });
};
