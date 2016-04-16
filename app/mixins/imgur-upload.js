import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Mixin.create({
    dataUrlToImgur: function(rawDataUrl) {
        var self = this;
        return new Ember.RSVP.Promise(function(resolveWith) {
            if ( ! rawDataUrl) {
                resolveWith(null);
                return;
            }

            Ember.$.ajax({
                url: ENV.imgur.uploadEndpoint,
                type: 'POST',
                headers: {
                    'Authorization': 'Client-ID ' + ENV.imgur.clientId
                },
                data: {
                    image: self._trimDataUrl(rawDataUrl),
                    type: 'base64'
                },
                success: function(response) {
                    resolveWith(response.data.link);
                },
                error: function(response) {
                    console.error('Imgur upload failed : ', response);
                    resolveWith(null);
                }
            });
        });
    },

    _trimDataUrl: function(rawDataUrl) {
        return rawDataUrl.substr(rawDataUrl.indexOf(',') + 1, rawDataUrl.length);
    }
});
