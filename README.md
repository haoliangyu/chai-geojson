# chai-geojson

This plugin extends existing [chaijs](http://chaijs.com/) APIs and introduces new ones for testing GeoJSON elegantly. It provides brief syntax for:

* type assertion

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
