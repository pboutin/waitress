import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    imageUrl: DS.attr('string'),

    group: DS.belongsTo('Group'),
    submitter: DS.belongsTo('User'),
    likes: DS.hasMany('User', {async: true, inverse: 'likedDishes'})
});
