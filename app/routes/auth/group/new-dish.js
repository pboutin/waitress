import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller) {
        controller.set('dish', this.store.createRecord('dish'));
        this._super(...arguments);
    },
    deactivate: function() {
        var newDish = this.controllerFor('auth.group.new-dish').get('dish');

        if (newDish.get('isNew')) {
            newDish.rollbackAttributes();
        }
    }
});
