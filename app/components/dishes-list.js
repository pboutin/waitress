import Ember from 'ember';

export default Ember.Component.extend({
    dishes: [],
    loggedUser: null,

    actions: {
        like(dish) {
            this.get('onLike')(dish);
        },
        delete(dish) {
            this.get('onDelete')(dish);
        }
    }
});
