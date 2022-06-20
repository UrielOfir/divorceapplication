export default {

    setPersonalDetails: ((state, personalDetails) => {
        state.personalDetails = personalDetails;
    }),

    initPersonalDetails: (state => {
        state.personalDetails =
            {
                firstName: "",
                lastName: "",
                birthday: "",
                address: {},
                children: [],
            }
    })

}
