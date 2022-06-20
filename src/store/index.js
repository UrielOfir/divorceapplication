import Vue from 'vue';
import Vuex from 'vuex';
import debts from './debts'
import personalDetails from './personalDetails'
import financialDetails from './financialDetails'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
        modules:{
            personalDetails,
            financialDetails,
            debts
        }
})

