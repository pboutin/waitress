import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('group', params.id);
    },
    setupController(controller) {
        this._super(...arguments);
        controller.set('newDish', null);
    },
    deactivate: function() {
        var newDish = this.controllerFor('group').get('newDish');

        if (newDish) {
            newDish.rollbackAttributes();
        }
    }
});
