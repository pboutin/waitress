import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('public', {path: '/'}, function() {
        this.route('login', {path: '/'});
        this.route('signup');
    });

    this.route('auth', function() {
        this.route('dishes');
        this.route('groups', {path: '/'});
        this.route('group', {path: '/group/:id'});
    });
});

export default Router;
