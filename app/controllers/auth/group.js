import Ember from 'ember';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),
    i18n: Ember.inject.service(),

    displayMode: 'list',

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
        delete(dish) {
            if ( ! confirm(this.get('i18n').t('group.are_you_sure_delete', { dish: dish.get('name') }))) {
                return;
            }

            let group = dish.get('group');
            group.get('dishes').removeObject(dish);
            group.get('content').save();

            dish.get('likes').forEach(function(user) {
                user.get('likedDishes').removeObject(dish);
                user.save();
            });

            dish.deleteRecord();
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
        },
        switchDisplayMode() {
            let currentMode = this.get('displayMode');
            this.set('displayMode', currentMode === 'list' ? 'isotope' : 'list');
        }
    },

    displayedDishes: function() {
        return this.get('model.dishes')
            .filter(function(dish) {
                return ! dish.get('isNew');
            })
            .sortBy('name');
    }.property('model.dishes.@each.name'),

    isListDisplayMode: function() {
        return this.get('displayMode') === 'list';
    }.property('displayMode')
});

