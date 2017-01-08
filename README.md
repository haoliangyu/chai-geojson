# chai-geojson

This plugin extends existing [chaijs](http://chaijs.com/) APIs and introduces new ones for testing GeoJSON elegantly. It provides brief syntax for:

* type assertion
* geographic area and length assertion

## Installation

* NodeJS

``` bash
npm install chai-geojson --save-dev
```

## Usage

* NodeJS

``` javascript
const chai = require('chai');

chai.use(require('chai-geojson'));

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

/**
 * Do your tests with the following APIs.
 */
```

## API

See [test cases](https://github.com/haoliangyu/chai-geojson/tree/master/test) for complete use examples.

### Expect / Should

* **.a(type)**

  * @Param *{String}* type

The `a` assertion can be used to assert a GeoJSON object’s type and its geometry coordinates if there is any. Noted this doesn't recursively iterate each features in a FeatureCollection or assert the geometry in a Feature.

Supported types:

  * FeatureCollection
  * Feature
  * Geometry
  * Point
  * MultiPoint
  * LineString
  * MultiLineString
  * Polygon
  * MultiPolygon

``` javascript
expect(geojson).to.be.a('FeatureCollection');
expect(geojson).to.be.a('Feature');
expect(geojson).not.to.be.a('Point');

geojson.should.be.a('FeatureCollection');
geojson.should.not.be.a('Feature');
```

* **length**

Sets the `geomLength` flag later used as a chain precursor to a value comparison for the geographic length.

``` javascript
expect(geojson).to.have.length.above(2);
```

* **.lengthOf(value[, precision])**

* @param *{Number}* value expected length value in meters
* @param *{Number}* [precision=0] difference tolerance in percentage of the geographic length

Asserts that the length of LineString feature/geometry has the expected value.

``` javascript
expect(geojson).to.have.lengthOf(250, 0.01);
expect(geojson).not.to.have.lengthOf(250);
```

* **area**

Sets the `geomArea` flag later used as a chain precursor to a value comparison for the geographic area.

``` javascript
expect(geojson).to.have.area.below(2000);
```

* **.areaOf(value[, precision])**

* @param *{Number}* value expected area value in square meters
* @param *{Number}* [precision=0] difference tolerance in percentage of the geographic area

Asserts that the area of polygon feature/geometry has the expected value.

``` javascript
expect(geojson).to.have.areaOf(250, 0.05);
```

* **.equal(value[, precision])**

* @param *{Number}* value expected value in meters for length or in square meters for square meters
* @param *{Number}* [precision=0] difference tolerance in percentage of the expected value

The `equal` assertion can be used to assert whether the length or area of a geojson feature/geometry is equal to the expected value.

``` javascript
expect(geojson).to.have.area.equal(500);
expect(geojson).to.have.length.equal(250, 0.05);
```

* **.above(value)**

* @param *{Number}* value expected value in meters for length or in square meters for area

The `above` assertion can be used to assert whether the length or area of a geojson feature/geometry is above the given value.

``` javascript
expect(geojson).to.have.area.above(500);
expect(geojson).to.have.length.above(250);
```

* **.least(value)**

* @param *{Number}* value expected value in meters for length or in square meters for area

The `above` assertion can be used to assert whether the length or area of a geojson feature/geometry is at least the given value.

``` javascript
expect(geojson).to.have.area.at.least(500);
expect(geojson).to.have.length.at.least(250);
```

* **.most(value)**

* @param *{Number}* value expected value in meters for length or in square meters for area

The `above` assertion can be used to assert whether the length or area of a geojson feature/geometry is at most the given value.

``` javascript
expect(geojson).to.have.area.at.most(500);
expect(geojson).to.have.length.at.most(250);
```

* **.below(value)**

* @param *{Number}* value expected value in meters for length or in square meters for area

The `above` assertion can be used to assert whether the length or area of a geojson feature/geometry is below the given value.

``` javascript
expect(geojson).to.have.area.below(500);
expect(geojson).to.have.length.below(250);
```

* **.within(lower, upper)**

* @param *{Number}* lower  expected lower bound of input value
* @param *{Number}* upper  expected upper bound of input value

The `within` assertion can be used to assert whether the length or area of a geojson feature/geometry is within the given range.

``` javascript
expect(geojson).to.have.area.within(500, 800);
expect(geojson).to.have.length.within(250, 300);
```


### Assert

* **.typeOf(type)**

  * @Param *{String}* type

Same as `.a(type)` in expect / should style.

``` javascript
assert.typeOf(geojson, 'Feature');
```

* **.notTypeOf(type)**

  * @Param *{String}* type

Same as `.not.a(type)` in expect / should style.

``` javascript
assert.notTypeOf(geojson, 'Feature');
```

## Lincense

MIT
