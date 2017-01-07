import area from '@turf/area';
import lineDistance from '@turf/line-distance';

export function areaEquals(propertyAssertion, expected, precision) {
  let actual = area(propertyAssertion._obj);
  let bound = expected * precision;

  propertyAssertion.assert(
    expected - bound <= actual && actual <= expected + bound,
    `expected area ${actual} m^2 to euqal ${expected} m^2 with ${precision} percision`,
    `expected area ${actual} m^2 not to euqal ${expected} m^2 with ${precision} percision`
  );
}

export function areaAbove(propertyAssertion, bound) {
  let actual = area(propertyAssertion._obj);

  propertyAssertion.assert(
    actual > bound,
    `expected area ${actual} m^2 to be above ${bound} m^2`,
    `expected area ${actual} m^2 not to be above ${bound} m^2`
  );
}

export function areaBelow(propertyAssertion, bound) {
  let actual = area(propertyAssertion._obj);

  propertyAssertion.assert(
    actual < bound,
    `expected area ${actual} m^2 to be below ${bound} m^2`,
    `expected area ${actual} m^2 not to be below ${bound} m^2`
  );
}

export function areaWithin(propertyAssertion, lower, upper) {
  let actual = area(propertyAssertion._obj);

  propertyAssertion.assert(
    lower <= actual && actual <= upper,
    `expected area ${actual} m^2 to be within ${lower} and ${upper} m^2`,
    `expected area ${actual} m^2 not to be within ${lower} and ${upper} m^2`
  );
}
