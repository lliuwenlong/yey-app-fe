import mutations from './mutations';
import getters from "./getters";
import state from './state';
import action from './actions';

export default {
    namespaced: true,
    state,
    mutations,
    action,
    getters
};
