import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),

    dishes: DS.hasMany('Dish'),
    owner: DS.belongsTo('User', {async: true, inverse: 'ownedGroups'}),
    users: DS.hasMany('User', {async: true, inverse: 'groups'})
});
