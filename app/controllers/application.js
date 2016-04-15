import Ember from 'ember';

export default Ember.Controller.extend({
    loggedUser: null,

    actions: {
        logout() {
            this.get('session').close();
            location.reload(true);
        }
    },

    loadLoggedUser() {
        var self = this;

        return new Ember.RSVP.Promise(function(resolveWith) {
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
