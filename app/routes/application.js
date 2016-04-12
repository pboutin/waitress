import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel() {
        return this.get("session").fetch().catch(function() {});
    },
    setupController(controller) {
        return controller.loadLoggedUser();
    }
});
