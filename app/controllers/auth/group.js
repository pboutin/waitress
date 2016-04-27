import Ember from 'ember';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),

    newDish: null,
    imageDataUrl: null,

    actions: {
        like(dish) {
            var loggedUser = this.get('applicationController.loggedUser');

            if (dish.get('likes').contains(loggedUser)) {
                loggedUser.get('likedDishes').removeObject(dish);
                dish.get('likes').removeObject(loggedUser);
            } else {
                loggedUser.get('likedDishes').pushObject(dish);
                dish.get('likes').pushObject(loggedUser);
            }

            loggedUser.save();
            dish.save();
        },
        clearLikes() {
            var loggedUser = this.get('applicationController.loggedUser');
            this.get('model.dishes').forEach(function(dish) {
                if (dish.get('likes').contains(loggedUser)) {
                    loggedUser.get('likedDishes').removeObject(dish);
                    dish.get('likes').removeObject(loggedUser);

                    loggedUser.save();
                    dish.save();
                }
            });
        }
    },

    displayedDishes: function() {
        return this.get('model.dishes').filter(function(dish) {
            return ! dish.get('isNew');
        });
    }.property('model.dishes.@each')
});

