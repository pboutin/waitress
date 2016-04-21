import Ember from 'ember';
import ImgurUpload from '../../mixins/imgur-upload';

export default Ember.Controller.extend(ImgurUpload, {
    applicationController: Ember.inject.controller('application'),

    inviteEmail: '',
    inviteCandidates: null,

    newDish: null,
    imageDataUrl: null,

    actions: {
        invite(user) {
            let group = this.get('model');

            user.get('groups').pushObject(group);
            group.get('users').pushObject(user);

            group.save();
            user.save();

            this.get('inviteCandidates').removeObject(user);
        },
        addDish() {
            let dish = this.store.createRecord('dish');
            dish.set('submitter', this.get('applicationController.loggedUser'));
            dish.set('group', this.get('model'));
            this.set('newDish', dish);
        },
        saveDish() {
            var self = this;
            var loggedUser = this.get('applicationController.loggedUser');
            var currentGroup = this.get('model');
            var dish = this.get('newDish');

            this.dataUrlToImgur(this.get('imageDataUrl')).then(function(imageUrl) {
                dish.set('imageUrl', imageUrl);
                dish.save().then(function(savedDish) {
                    loggedUser.get('submittedDishes').pushObject(savedDish);
                    loggedUser.save();

                    currentGroup.get('dishes').pushObject(savedDish);
                    currentGroup.save();

                    self.set('newDish', null);
                });
            });
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

