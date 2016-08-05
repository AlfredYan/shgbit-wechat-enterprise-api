var expect = require('expect.js');
var config = require('./config');
var API = require('../');

describe('tag', function () {
  var api = new API(config.corpid, config.corpsecret);
  var id;
  before(function (done) {
    api.getAccessToken(done);
  });

  it('createTag should ok', function (done) {
    api.createTag('tag_' + Math.random(), function (err, data, res) {
      expect(err).not.to.be.ok();
      expect(data).to.have.key('tagid');
      id = data.tagid;
      done();
    });
  });

  it('updateTagName should ok', function (done) {
    api.updateTagName(id, 'new_tag_' + Math.random(), function (err, data, res) {
      expect(err).not.to.be.ok();
      expect(data).to.have.property('errmsg', 'updated');
      done();
    });
  });

  it('addTagUsers should ok', function (done) {
    api.addTagUsers(id, ['JacksonTian'], function (err, data, res) {
      expect(err).not.to.be.ok();
      expect(data).to.have.property('errmsg', 'ok');
      done();
    });
  });

  it('getTagUsers should not ok', function (done) {
    api.getTagUsers(id, function (err, data, res) {
      expect(err).not.to.be.ok();
      expect(data).to.have.property('errmsg', 'ok');
      expect(data.userlist).to.be.an('array');
      done();
    });
  });

  it('deleteTagUsers should ok', function (done) {
    api.deleteTagUsers(id, ['JacksonTian'], function (err, data, res) {
      expect(err).not.to.be.ok();
      expect(data).to.have.property('errmsg', 'ok');
      done();
    });
  });

  it('deleteTag should ok', function (done) {
    api.deleteTag(id, function (err, data, res) {
      expect(err).not.to.be.ok();
      expect(data).to.have.property('errmsg', 'deleted');
      done();
    });
  });
});
