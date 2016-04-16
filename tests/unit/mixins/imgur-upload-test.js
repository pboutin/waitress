import Ember from 'ember';
import ImgurUploadMixin from '../../../mixins/imgur-upload';
import { module, test } from 'qunit';

module('Unit | Mixin | imgur upload');

// Replace this with your real tests.
test('it works', function(assert) {
  let ImgurUploadObject = Ember.Object.extend(ImgurUploadMixin);
  let subject = ImgurUploadObject.create();
  assert.ok(subject);
});
