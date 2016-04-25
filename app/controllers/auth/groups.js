import Ember from 'ember';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),

    newGroup: null,
    ownedGroups: null,
    groups: null,

    actions: {
        createNewGroup() {
            let newGroup = this.store.createRecord('group');
            this.set('newGroup', newGroup);
            newGroup.set('owner', this.get('applicationController.loggedUser'));
        },
        saveNewGroup() {
            var self = this;
            var newGroup = this.get('newGroup');

            if ( ! newGroup) { return; }

            newGroup.save().then(function(savedGroup) {
                self.get('applicationController.loggedUser.ownedGroups').pushObject(savedGroup);
                self.get('applicationController.loggedUser').save();
                self.set('newGroup', null);
            });
        },
        cancelNewGroup() {
            this.get('newGroup').deleteRecord();
            this.set('newGroup', null);
        }
    },

    displayedGroups: function() {
        let ownedGroups = this.get('ownedGroups').toArray();
        let groups = this.get('groups').toArray();

        return ownedGroups
            .concat(groups)
            .filter(this._groupFilter)
            .sort(this._groupComparator);
    }.property('ownedGroups.@each', 'groups.@each'),

    _groupFilter: function(group) {
        return ! group.get('isNew');
    },
    _groupComparator: function(a, b) {
        if (a.get('name') < b.get('name')) {
            return -1;
        }
        if (a.get('name') > b.get('name')) {
            return 1;
        }
        return 0;
    }
});
