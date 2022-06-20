import database from "../../middleware/firebase/database";

export default {
    getFinancialDetails: async ({commit}) => {
        const financialDetails = await database.getUserData({entity: 'financialDetails'});
        if (financialDetails) {
            financialDetails.assets = database.objectConvertor(financialDetails.assets);
            financialDetails.debts = database.objectConvertor(financialDetails.debts);
            commit('setFinancialDetails', financialDetails);
        }
    },


    updateFinancialDetails: async ({state, commit}, updatedDetails) => {
        commit('setFinancialDetails', JSON.parse(JSON.stringify(updatedDetails)));
        updatedDetails.assets = database.arrayConvertor(updatedDetails.assets);
        updatedDetails.debts = database.arrayConvertor(updatedDetails.debts);
        await database.update({entity: 'financialDetails', details: updatedDetails});
    },

}
