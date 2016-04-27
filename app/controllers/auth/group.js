import Ember from 'ember';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),

    newDish: null,
    imageDataUrl: null,

    displayedDishes: function() {
        return this.get('model.dishes').filter(function(dish) {
            return ! dish.get('isNew');
        });
    }.property('model.dishes.@each')
});

