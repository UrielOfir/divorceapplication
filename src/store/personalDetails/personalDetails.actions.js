import database from "../../middleware/firebase/database";

export default {
    getPersonalDetails: async ({commit}) => {
        const personalDetails = await database.getUserData({entity: 'personalDetails'});
        if (personalDetails){
        personalDetails.children = database.objectConvertor(personalDetails.children);
        commit('setPersonalDetails', personalDetails);}
    },


    updateDetails: async ({state, commit}, updatedDetails) => {
        commit('setPersonalDetails', JSON.parse(JSON.stringify(updatedDetails)));
        updatedDetails.children= database.arrayConvertor(updatedDetails.children);
        await database.update({entity: 'personalDetails', details: updatedDetails});
    }


}
