export default {
    setFinancialDetails: ((state, financialDetails)=> {
        state.financialDetails = financialDetails;
    }),

    initFinancialDetails: (state => {
        state.financialDetails =
            {
                alimonyPerChild: "",
                divorceeExpens: "",
                elementarySchool: "",
                highSchool:"",
                income: "",
                mador: "",
            }
    })
}
