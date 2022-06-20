import database from "../../middleware/firebase/database";

export default {
    getDebts: async ({commit}) => {
        const debts = await database.getDebt({entity: 'debts'});
        commit('setDebts', debts);
    },

    updateDebts: async ({state,commit}, updatedDetails) => {
        commit('setDebts', updatedDetails);
        await database.update({entity:'debts', details: state.debts});
    }


}
