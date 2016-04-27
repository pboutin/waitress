import Ember from 'ember';
import ImgurUpload from '../../../mixins/imgur-upload';

export default Ember.Controller.extend(ImgurUpload, {
    applicationController: Ember.inject.controller('application'),

    dish: null,
    imageDataUrl: '',

    actions: {
        save() {
            if (this.get('isNotValid')) {
                return;
            }

            var self = this;
            var dish = this.get('dish');
            var submitter = this.get('applicationController.loggedUser');
            var currentGroup = this.get('model');

            dish.set('submitter', submitter);
            dish.set('group', currentGroup);

            this.dataUrlToImgur(this.get('imageDataUrl')).then(function(imageUrl) {
                dish.set('imageUrl', imageUrl);
                dish.save().then(function(savedDish) {
                    submitter.get('submittedDishes').pushObject(savedDish);
                    submitter.save();

                    currentGroup.get('dishes').pushObject(savedDish);
                    currentGroup.save();

                    self.set('imageDataUrl', '');

                    self.transitionToRoute('auth.group');
                });
            });
        },
        cancel() {
            this.set('imageDataUrl', '');
            this.transitionToRoute('auth.group');
        }
    },

    isNotValid: function() {
        return !this.get('dish.name');
    }.property('dish.name')
});
