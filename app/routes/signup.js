import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel() {
        if (this.get('session.isAuthenticated')) {
            return this.transitionTo('dishes');
        }
    },
    model() {
        return this.store.createRecord('user');
    },
    setupController(controller, model) {
        this._super(controller, model);
        controller.set('captchaOne', Math.floor(Math.random() * 20));
        controller.set('captchaTwo', Math.floor(Math.random() * 20));
    }
});
