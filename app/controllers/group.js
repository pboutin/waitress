import Ember from 'ember';

export default Ember.Controller.extend({
    inviteEmail: '',
    inviteCandidates: null,

    actions: {
        invite(user) {
            let group = this.get('model');

            user.get('groups').pushObject(group);
            group.get('users').pushObject(user);

            group.save();
            user.save();

            this.get('inviteCandidates').removeObject(user);
        }
    },

    inviteEmailObserver: function() {
        Ember.run.debounce(this, this._fetchCandidates, 1000);
    }.observes('inviteEmail'),

    _fetchCandidates: function() {
        var self = this;

        this.store.query('user', {
            orderBy: 'email',
            equalTo: this.get('inviteEmail')
        }).then(function(result) {
            self.set('inviteCandidates', result);
        });
    }
});

