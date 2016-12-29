const chai = require('chai');

chai.use(require('../dist/chai-geojson.js'));

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

describe('Expect to assert GeoJSON types', () => {

  it('should assert the FeatureCollection type.', () => {
    let geojson = {
      type: 'FeatureCollection',
      features: []
    };

    expect(geojson).to.be.a('FeatureCollection');
  });

  it('should assert the Feature type.', () => {
    let geojson = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [0, 0] },
      properties: {}
    };

    expect(geojson).to.be.a('Feature');
  });

  it('should assert the Point type.', () => {
    let geometry = { type: 'Point', coordinates: [0, 0] };
    expect(geometry).to.be.a('Point');
  });

  it('should assert the LineString type.', () => {
    let geometry = { type: 'LineString', coordinates: [[0, 0], [1, 1]] };
    expect(geometry).to.be.a('LineString');
  });

  it('should assert the Polygon type.', () => {
    let geometry = { type: 'Polygon', coordinates: [[[0, 0], [1, 1], [1, 2]]] };
    expect(geometry).to.be.a('Polygon');
  });

  it('should assert the MultiPoint type.', () => {
    let geometry = { type: 'MultiPoint', coordinates: [[0, 0], [1, 1]] };
    expect(geometry).to.be.a('MultiPoint');
  });

  it('should assert the MultiLineString type.', () => {
    let geometry = { type: 'MultiLineString', coordinates: [[[0, 0], [1, 1], [1, 2]]] };
    expect(geometry).to.be.a('MultiLineString');
  });

  it('should assert the MultiPolygon type.', () => {
    let geometry = { type: 'MultiPolygon', coordinates: [[[[0, 0], [1, 1], [1, 2]]]] };
    expect(geometry).to.be.a('MultiPolygon');
  });

  it('should reject an invalid FeatureCollection GeoJSON.', () => {
    let geojson = {
      type: 'NotFeatureCollection',
      features: []
    };

    expect(geojson).not.to.be.a('FeatureCollection');
  });

});

describe('Should assert GeoJSON types', () => {

  it('should assert the FeatureCollection type.', () => {
    let geojson = {
      type: 'FeatureCollection',
      features: []
    };

    geojson.should.be.a('FeatureCollection');
  });

  it('should assert the Feature type.', () => {
    let geojson = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [0, 0] },
      properties: {}
    };

    geojson.should.be.a('Feature');
  });

  it('should assert the Point type.', () => {
    let geometry = { type: 'Point', coordinates: [0, 0] };
    geometry.should.be.a('Point');
  });

  it('should assert the LineString type.', () => {
    let geometry = { type: 'LineString', coordinates: [[0, 0], [1, 1]] };
    geometry.should.be.a('LineString');
  });

  it('should assert the Polygon type.', () => {
    let geometry = { type: 'Polygon', coordinates: [[[0, 0], [1, 1], [1, 2]]] };
    geometry.should.be.a('Polygon');
  });

  it('should assert the MultiPoint type.', () => {
    let geometry = { type: 'MultiPoint', coordinates: [[0, 0], [1, 1]] };
    geometry.should.be.a('MultiPoint');
  });

  it('should assert the MultiLineString type.', () => {
    let geometry = { type: 'MultiLineString', coordinates: [[[0, 0], [1, 1], [1, 2]]] };
    geometry.should.be.a('MultiLineString');
  });

  it('should assert the MultiPolygon type.', () => {
    let geometry = { type: 'MultiPolygon', coordinates: [[[[0, 0], [1, 1], [1, 2]]]] };
    geometry.should.be.a('MultiPolygon');
  });

  it('should reject an invalid FeatureCollection GeoJSON.', () => {
    let geojson = {
      type: 'NotFeatureCollection',
      features: []
    };

    geojson.should.not.be.a('FeatureCollection');
  });

});

describe('Assert GeoJSON types', () => {

  it('should assert the FeatureCollection type.', () => {
    let geojson = {
      type: 'FeatureCollection',
      features: []
    };

    assert.typeOf(geojson, 'FeatureCollection');
  });

  it('should assert the Feature type.', () => {
    let geojson = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [0, 0] },
      properties: {}
    };

    assert.typeOf(geojson, 'Feature');
  });

  it('should assert the Point type.', () => {
    let geometry = { type: 'Point', coordinates: [0, 0] };
    assert.typeOf(geometry, 'Point');
  });

  it('should assert the LineString type.', () => {
    let geometry = { type: 'LineString', coordinates: [[0, 0], [1, 1]] };
    assert.typeOf(geometry, 'LineString');
  });

  it('should assert the Polygon type.', () => {
    let geometry = { type: 'Polygon', coordinates: [[[0, 0], [1, 1], [1, 2]]] };
    assert.typeOf(geometry, 'Polygon');
  });

  it('should assert the MultiPoint type.', () => {
    let geometry = { type: 'MultiPoint', coordinates: [[0, 0], [1, 1]] };
    assert.typeOf(geometry, 'MultiPoint');
  });

  it('should assert the MultiLineString type.', () => {
    let geometry = { type: 'MultiLineString', coordinates: [[[0, 0], [1, 1], [1, 2]]] };
    assert.typeOf(geometry, 'MultiLineString');
  });

  it('should assert the MultiPolygon type.', () => {
    let geometry = { type: 'MultiPolygon', coordinates: [[[[0, 0], [1, 1], [1, 2]]]] };
    assert.typeOf(geometry, 'MultiPolygon');
  });

  it('should reject an invalid FeatureCollection GeoJSON.', () => {
    let geojson = {
      type: 'NotFeatureCollection',
      features: []
    };

    assert.notTypeOf(geojson, 'FeatureCollection');
  });

});
