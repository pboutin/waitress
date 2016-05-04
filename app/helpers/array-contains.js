import Ember from 'ember';

export function arrayContains(params/*, hash*/) {
    let array = params[0];
    let element = params[1];
    return array.contains(element);
}

export default Ember.Helper.helper(arrayContains);
