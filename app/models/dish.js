import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    notes: DS.attr('string'),
    pictureUrl: DS.attr('string'),

    group: DS.belongsTo('Group'),
    submitter: DS.belongsTo('User'),
    pins: DS.hasMany('Dish')
});
