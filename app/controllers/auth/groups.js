import Ember from 'ember';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),

    newGroup: null,

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
            this.set('newGroup', null);
        }
    }
});
