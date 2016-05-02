import Ember from 'ember';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),

    actions: {
        logout() {
            this.get('session').close();
            location.href = '';
        }
    }
});
