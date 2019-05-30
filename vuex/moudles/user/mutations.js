import {SET_STAFFID, SET_LOGINSTSTE} from './mutations-types';
export default {
    [SET_STAFFID](state, userInfo) {
        state.userInfo = userInfo;
    },
    [SET_LOGINSTSTE](state, isLoading) {
        state.isLoading = isLoading;
    }
};