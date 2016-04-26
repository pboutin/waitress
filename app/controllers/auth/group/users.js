import Ember from 'ember';

export default Ember.Controller.extend({
    emailInput: '',
    foundUser: null,

    actions: {
        removeUser(user) {
            let group = this.get('model');

            group.get('users').removeObject(user);
            user.get('groups').removeObject(group);

            group.save();
            user.save();
        },
        addUser() {
            let group = this.get('model');
            let user = this.get('foundUser');

            user.get('groups').pushObject(group);
            group.get('users').pushObject(user);

            group.save();
            user.save();

            this.set('emailInput', '');
            this.set('foundUser', null);
        },
        searchUser() {
            this._searchUser();
        }
    },

    inviteEmailObserver: function() {
        Ember.run.debounce(this, this._searchUser, 1000);
    }.observes('emailInput'),

    foundUserAlreadyInGroup: function() {
        let foundUser = this.get('foundUser');

        if ( ! foundUser) {
            return false;
        }

        let userIds = this.get('model.users').mapBy('id');
        userIds.push(this.get('model.owner.id'));
        return userIds.contains(foundUser.get('id'));
    }.property('model.users.@each'),

    _searchUser: function() {
        var self = this;

        this.store.query('user', {
            orderBy: 'email',
            equalTo: this.get('emailInput')
        }).then(function(result) {
            self.set('foundUser', result.get('firstObject'));
        });
    }
});
