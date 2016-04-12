import Ember from 'ember';
import AuthRouteMixin from '../mixins/auth-route';

export default Ember.Route.extend(AuthRouteMixin, {
    model: function(params) {
        return this.store.find('group', params.id);
    },
});
