import Ember from 'ember';
import ImgurUpload from '../../mixins/imgur-upload';

export default Ember.Controller.extend(ImgurUpload, {
    applicationController: Ember.inject.controller('application'),

    newDish: null,
    imageDataUrl: null,

    actions: {
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
    }
});

