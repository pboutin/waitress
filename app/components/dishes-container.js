import Ember from 'ember';

export default Ember.Component.extend({
    dishes: [],

    filter: '',
    $cardContainer: null,

    actions: {
        shuffle() {
            this.get('$cardContainer')
                .isotope('shuffle');
        },
        sortByName() {
            this._sortBy('name');
        },
        sortByLikes() {
            this._sortBy('likes');
        },
        like(dish) {
            this.get('onLike')(dish);
        },
        clear() {
            this.get('onClear')();
        }
    },

    didInsertElement: function() {
        var $cardContainer = this.$('.grid').isotope({
            itemSelector: '.grid-item',
            getSortData: {
                name: function(element) {
                    return $(element).find('._name').text().toLowerCase();
                },
                likes: function(element) {
                    return $(element).find('._avatar').length * -1;
                }
            },
            masonry: {
                columnWidth: 250,
                gutter: 10

            }
        });
        this.set('$cardContainer', $cardContainer);
    },

    didRender: function() {
        var $cardContainer = this.get('$cardContainer');

        if (this.get('dishes').length > $cardContainer.isotope('getItemElements').length) {
            $cardContainer.isotope('reloadItems');
            $cardContainer.isotope();
        }

        $cardContainer.imagesLoaded().progress(function() {
            $cardContainer.isotope('layout');
        });
    },

    filterObserver: function() {
        var $cardContainer = this.get('$cardContainer');
        var filterString = this.get('filter').toLowerCase();

        if ( ! filterString) {
            $cardContainer.isotope({
                filter: '*'
            });
        } else {
            $cardContainer.isotope({
                filter: function() {
                    var currentName = $(this).find('._name').text().toLowerCase();
                    return currentName.indexOf(filterString) > -1;
                }
            });
        }
    }.observes('filter'),

    _sortBy: function(mode) {
        this.get('$cardContainer')
            .isotope('updateSortData')
            .isotope({
                sortBy: mode
            });
    }
});
