import Ember from 'ember';

export default Ember.Component.extend({
    dishes: [],
    onClick: null,

    filter: '',
    $container: null,

    actions: {
        shuffle() {
            this.get('$container')
                .isotope('shuffle');
        },
        sortByName() {
            this._sortBy('name');
        },
        sortByLikes() {
            this._sortBy('likes');
        },
        select(dish) {
            this.get('onSelect')(dish);
        },
        clear() {
            this.get('onClear')();
        }
    },

    didInsertElement: function() {
        var $container = this.$('.grid').isotope({
            itemSelector: '.grid-item',
            getSortData: {
                name: function(element) {
                    return $(element).find('._name').text().toLowerCase();
                },
                likes: function(element) {
                    console.log($(element).find('._avatar').length);
                    return $(element).find('._avatar').length * -1;
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
    }.observes('filter'),

    _sortBy: function(mode) {
        this.get('$container')
            .isotope('updateSortData')
            .isotope({
                sortBy: mode
            });
    }
});
