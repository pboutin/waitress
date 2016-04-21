import Ember from 'ember';
import Firebase from 'firebase';
import ENV from '../../config/environment';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),

    captchaOne: null,
    captchaTwo: null,

    captcha: '',
    password: '',
    passwordConfirmation: '',

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
                            self.transitionToRoute('auth.groups');
                        });
                    });
                }
            });
        }
    },

    requiredVerification: function() {
        let result = true;
        result &= !!this.get('model.name');
        result &= !!this.get('model.email');
        result &= !!this.get('password');
        result &= !!this.get('passwordConfirmation');
        result &= !!this.get('captcha');
        return result;
    }.property('model.name', 'model.email', 'password', 'passwordConfirmation', 'captcha'),

    passwordVerification: function() {
        var confirmation = this.get('passwordConfirmation');
        if (confirmation) {
            return this.get('password') === confirmation;
        }
        return true;
    }.property('password', 'passwordConfirmation'),

    captchaVerification: function() {
        let captcha = this.get('captcha');
        return captcha === '' || parseInt(captcha, 10) === (this.get('captchaOne') + this.get('captchaTwo'));
    }.property('captcha', 'captchaOne', 'captchaTwo'),

    isNotValid: function() {
        let result = true;
        result &= this.get('requiredVerfication');
        result &= this.get('passwordVerification');
        result &= this.get('captchaVerification');
        return ! result;
    }.property('passwordVerification', 'captchaVerification')
});

