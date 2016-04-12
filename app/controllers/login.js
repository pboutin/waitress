import Ember from 'ember';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),

    email: '',
    password: '',

    actions: {
        login() {
            var self = this;

            this.get('session').open('firebase', {
                provider: 'password',
                email: this.get('email'),
                password: this.get('password')
            }).then(function() {
                self.get('applicationController').loadLoggedUser();
                self.transitionToRoute('groups');
            });
        }
    }
});
