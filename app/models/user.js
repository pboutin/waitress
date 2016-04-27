import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    email: DS.attr('string'),
    userId: DS.attr('string'),

    ownedGroups: DS.hasMany('Group', {async: true, inverse: 'owner'}),
    groups: DS.hasMany('Group', {async: true, inverse: 'users'}),
    submittedDishes: DS.hasMany('Dish', {async: true, inverse: 'submitter'}),
    likedDishes: DS.hasMany('Dish', {async: true, inverse: 'likes'})
});
