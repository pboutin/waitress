import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        var applicationController = this.controllerFor('application');

        return new Ember.RSVP.Promise(function(resolve) {
            applicationController.loadLoggedUser().then(function(user) {
                Ember.RSVP.hash({
                    ownedGroups: user.get('ownedGroups'),
                    groups: user.get('groups')
                }).then(resolve);
            });
        });
    },
    setupController(controller, model) {
        controller.set('ownedGroups', model.ownedGroups);
        controller.set('groups', model.groups);
    }
});
