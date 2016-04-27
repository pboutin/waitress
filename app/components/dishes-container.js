import Ember from 'ember';

export default Ember.Component.extend({
    dishes: [],

    filter: '',
    $container: null,

    actions: {
        shuffle() {
            this.get('$container')
                .isotope('shuffle');
        },
        sort() {
            this.get('$container')
                .isotope('updateSortData')
                .isotope({
                    sortBy: 'name'
                });
        }
    },

    didInsertElement: function() {
        var $container = this.$('.grid').isotope({
            itemSelector: '.grid-item',
            getSortData: {
                name: function(element) {
                    return $(element).find('._name').text().toLowerCase();
                }
            },
            masonry: {
                columnWidth: 250,
                gutter: 10

            }
        });
        this.set('$container', $container);
    },

    didRender: function() {
        var $container = this.get('$container');

        if (this.get('dishes').length > $container.isotope('getItemElements').length) {
            $container.isotope('reloadItems');
            $container.isotope();
        }

        $container.imagesLoaded().progress(function() {
            $container.isotope('layout');
        });
    },

    filterObserver: function() {
        var $container = this.get('$container');
        var filterString = this.get('filter').toLowerCase();

        if ( ! filterString) {
            $container.isotope({
                filter: '*'
            });
        } else {
            $container.isotope({
                filter: function() {
                    var currentName = $(this).find('._name').text().toLowerCase();
                    return currentName.indexOf(filterString) > -1;
                }
            });
        }
    }.observes('filter')
});
