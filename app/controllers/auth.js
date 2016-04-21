import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        logout() {
            this.get('session').close();
            location.reload(true);
        }
    }
});
