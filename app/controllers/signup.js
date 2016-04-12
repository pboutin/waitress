import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),

    captcha: null,
    password: '',
    passwordConfirmation: '',

    captchaOne: null,
    captchaTwo: null,

    actions: {
        signup() {
            if (this.get('isNotValid')) {
                return;
            }
            let ref = new Firebase(ENV.firebase);
            var user = this.get('model');
            var self = this;

            ref.createUser({
                email: user.get('email'),
                password: this.get('password')
            }, function(error, authData) {
                if (error) {
                    console.log('Something went wrong : ', error);
                } else {
                    self.get('session').open('firebase', {
                        provider: 'password',
                        email: user.get('email'),
                        password: self.get('password')
                    }).then(function() {
                        user.set('userId', authData.uid);
                        user.save().then(function() {
                            self.get('applicationController').loadLoggedUser();
                            self.transitionToRoute('dishes');
                        });
                    });
                }
            });
        }
    },

    passwordVerification: Ember.computed('password', 'passwordConfirmation', function() {
        return this.get('password') === this.get('passwordConfirmation');
    }),

    captchaVerification: function() {
        return parseInt(this.get('captcha'), 10) === (this.get('captchaOne') + this.get('captchaTwo'));
    }.property('captcha', 'captchaOne', 'captchaTwo'),

    isNotValid: function() {
        return ! (this.get('passwordVerification') && this.get('captchaVerification'));
    }.property('passwordVerification', 'captchaVerification')
});

