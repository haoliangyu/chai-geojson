import area from '@turf/area';
import lineDistance from '@turf/line-distance';

export function areaEqual(propertyAssertion, expected, precision) {
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

export function areaAtLeast(propertyAssertion, bound) {
  let actual = area(propertyAssertion._obj);

  propertyAssertion.assert(
    actual >= bound,
    `expected area ${actual} m^2 to be at least ${bound} m^2`,
    `expected area ${actual} m^2 not to be at least ${bound} m^2`
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

export function areaAtMost(propertyAssertion, bound) {
  let actual = area(propertyAssertion._obj);

  propertyAssertion.assert(
    actual <= bound,
    `expected area ${actual} m^2 to be at most ${bound} m^2`,
    `expected area ${actual} m^2 not to be at most ${bound} m^2`
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

export function lengthEqual(propertyAssertion, expected, precision) {
  let actual = lineDistance(propertyAssertion._obj) * 1000;
  let bound = expected * precision;

  propertyAssertion.assert(
    expected - bound <= actual && actual <= expected + bound,
    `expected length ${actual} m to euqal ${expected} m with ${precision} percision`,
    `expected length ${actual} m not to euqal ${expected} m with ${precision} percision`
  );
}

export function lengthAbove(propertyAssertion, bound) {
  let actual = lineDistance(propertyAssertion._obj) * 1000;

  propertyAssertion.assert(
    actual > bound,
    `expected length ${actual} m to be above ${bound} m`,
    `expected length ${actual} m not to be above ${bound} m`
  );
}

export function lengthAtLeast(propertyAssertion, bound) {
  let actual = lineDistance(propertyAssertion._obj) * 1000;

  propertyAssertion.assert(
    actual >= bound,
    `expected length ${actual} m to be at least ${bound} m`,
    `expected length ${actual} m not to be at least ${bound} m`
  );
}

export function lengthBelow(propertyAssertion, bound) {
  let actual = lineDistance(propertyAssertion._obj) * 1000;

  propertyAssertion.assert(
    actual < bound,
    `expected length ${actual} m to be below ${bound} m`,
    `expected length ${actual} m not to be below ${bound} m`
  );
}

export function lengthAtMost(propertyAssertion, bound) {
  let actual = lineDistance(propertyAssertion._obj) * 1000;

  propertyAssertion.assert(
    actual <= bound,
    `expected length ${actual} m to be at most ${bound} m`,
    `expected length ${actual} m not to be at most ${bound} m`
  );
}

export function lengthWithin(propertyAssertion, lower, upper) {
  let actual = lineDistance(propertyAssertion._obj) * 1000;

  propertyAssertion.assert(
    lower <= actual && actual <= upper,
    `expected length ${actual} m to be within ${lower} and ${upper} m`,
    `expected length ${actual} m not to be within ${lower} and ${upper} m`
  );
}
