import Ember from 'ember';

export default Ember.Component.extend({
    text: null,
    suffix: null,

    didInsertElement: function() {
        this._initTooltip();
    },
    willDestroyElement: function() {
        this.$().tooltip('destroy');
    },

    _initTooltip: function() {
        let title = this.get('text');

        if (title) {
            let suffix = this.get('suffix');

            if (suffix) {
                title += ' (' + suffix + ')';
            }

            this.$().tooltip({
                title: title,
                placement: 'top',
                trigger: 'hover'
            });
        }
    }.observes('text', 'suffix')
});
