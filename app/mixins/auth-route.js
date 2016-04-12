import Ember from 'ember';

export default Ember.Mixin.create({
    beforeModel() {
        if ( ! this.get('session.isAuthenticated')) {
            return this.transitionTo('login');
        }
    }
});
