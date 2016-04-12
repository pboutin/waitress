import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),

    owner: DS.belongsTo('user', {async: true, inverse: 'ownedGroups'}),
    users: DS.hasMany('user', {async: true, inverse: 'groups'})
});
