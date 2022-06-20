import state from './debts.state';
import actions from './debts.actions';
import getters from './debts.getters';
import mutations from './debts.mutation';


export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}
