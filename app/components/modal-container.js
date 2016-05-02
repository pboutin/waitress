import Ember from 'ember';

export default Ember.Component.extend({
    title: '',

    didInsertElement: function() {
        this.$('.modal').modal({
            keyboard: false,
            backdrop: 'static'
        });
    },

    willDestroyElement: function() {
        this.$('.modal').modal('hide');
    }
});
