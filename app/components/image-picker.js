import Ember from 'ember';

export default Ember.Component.extend({
    tagName: null,

    dataUrl: null,

    didInsertElement: function() {
        var self = this;

        this.$('input').on('change', function() {
            if (this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    self.set('dataUrl', e.target.result);
                }

                reader.readAsDataURL(this.files[0]);
            }
        });
    },
    willDestroyElement: function() {
        this.$('input').off('change');
    }
});
