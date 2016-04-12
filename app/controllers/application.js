import Ember from 'ember';

export default Ember.Controller.extend({
    loggedUser: null,

    actions: {
        logout() {
            this.get('loggedUser').unloadRecord();
            this.set('loggedUser', null);
            this.get('session').close();
            this.transitionToRoute('login');
        }
    },

    loadLoggedUser() {
        var self = this;

        if (this.get('session.isAuthenticated')) {
            this.store.query('user', {
                orderBy: 'userId',
                equalTo: this.get('session.uid')
            }).then(function(result) {
                self.set('loggedUser', result.get('firstObject'));
            });
        }
        self.set('loggedUser', null);
    }
});
