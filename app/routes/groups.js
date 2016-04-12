import Ember from 'ember';
import AuthRouteMixin from '../mixins/auth-route';

export default Ember.Route.extend(AuthRouteMixin, {
    model() {
        var self = this;

        return new Promise(function(resolve) {
            self.controllerFor('application').loadLoggedUser().then(function(user) {
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
