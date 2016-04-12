import Ember from 'ember';

export default Ember.Controller.extend({
    loggedUser: null,

    actions: {
        logout() {
            this.store.unloadAll();
            this.set('loggedUser', null);
            this.get('session').close();
            this.transitionToRoute('login');
        }
    },

    loadLoggedUser() {
        var self = this;

        return new Promise(function(resolveWith) {
            if (self.get('session.isAuthenticated')) {
                self.store.query('user', {
                    orderBy: 'email',
                    equalTo: self.get('session.currentUser.email')
                }).then(function(result) {
                    let user = result.get('firstObject');
                    self.set('loggedUser', user);
                    resolveWith(user);
                });
            } else {
                self.set('loggedUser', null);
                resolveWith(null);
            }
        });
    }
});
