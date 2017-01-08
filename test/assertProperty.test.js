const chai = require('chai');

chai.use(require('../dist/chai-geojson.js'));

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

const polygon = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-78.861923, 43.033262], [-78.861923, 43.062366], [-78.804244, 43.062366], [-78.804244, 43.033262], [-78.861923, 43.033262]
      ]
    ]
  }
};

const linestring = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [[-78.861923, 43.033262], [-78.861923, 43.062366]]
  }
};

describe('Expect to assert GeoJSON properties', () => {

  it('should assert GeoJSON area', () => {
    expect(polygon).to.have.areaOf(15194923, 0.01);
    expect(polygon.geometry).to.have.areaOf(15194923, 0.01);
    expect(polygon).to.not.have.areaOf(100);

    expect(polygon).to.have.area.above(15000000);
    expect(polygon).to.have.area.at.least(15000000);
    expect(polygon).to.have.area.below(16000000);
    expect(polygon).to.have.area.at.most(16000000);
    expect(polygon).to.have.area.within(15000000, 16000000);
  });

  it('should assert GeoJSON length', () => {
    expect(linestring).to.have.lengthOf(3233, 0.01);
    expect(linestring.geometry).to.have.lengthOf(3233, 0.01);
    expect(linestring).to.not.have.lengthOf(3500);

    expect(linestring).to.have.length.above(3200);
    expect(linestring).to.have.length.at.least(3200);
    expect(linestring).to.have.length.below(3300);
    expect(linestring).to.have.length.at.most(3300);
    expect(linestring).to.have.length.within(3200, 3300);
  });
});

describe('Should assert GeoJSON properties', () => {

  it('should assert GeoJSON area', () => {
    polygon.should.have.areaOf(15194923, 0.01);
    polygon.should.not.have.areaOf(100);

    polygon.should.have.area.above(15000000);
    polygon.should.have.area.at.least(15000000);
    polygon.should.have.area.below(16000000);
    polygon.should.have.area.at.most(16000000);
    polygon.should.have.area.within(15000000, 16000000);
  });

  it('should assert GeoJSON length', () => {
    linestring.should.have.lengthOf(3233, 0.01);
    linestring.should.to.not.have.lengthOf(3500);

    linestring.should.to.have.length.above(3200);
    linestring.should.to.have.length.at.least(3200);
    linestring.should.to.have.length.below(3300);
    linestring.should.to.have.length.at.most(3300);
    linestring.should.to.have.length.within(3200, 3300);
  });
});
