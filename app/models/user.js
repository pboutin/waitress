import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    email: DS.attr('string'),
    userId: DS.attr('string'),

    ownedGroups: DS.hasMany('group', {async: true, inverse: 'owner'}),
    groups: DS.hasMany('group', {async: true, inverse: 'users'})
});
