const chai = require('chai');

chai.use(require('../dist/chai-geojson.js'));

const expect = chai.expect;

describe('Assert Type', () => {

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
    expect(geometry).to.be.a('Geometry');
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

});
