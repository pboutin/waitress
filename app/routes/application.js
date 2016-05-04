import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel() {
        return this.session.fetch().catch(function() {});
    },
    setupController(controller) {
        controller.set('isChrome', /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor));
        return controller.loadLoggedUser();
    }
});

