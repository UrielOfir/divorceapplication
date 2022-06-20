<template>
  <div>
    <h4>עדכון מצב כלכלי</h4>
    <div> נא להכניס את התשלום שהגרוש משלם בפועל. (במידה ומשלם חצי על החינוך, יכניס רק את התשלום של החצי שהוא משלם)
    </div>
    <q-input label="משכורת חודשית ממוצעת" type="number" v-model.number="tmpDetails.income"/>
    <q-input label="תשלום מזונות חודשי לילד" type="number" v-model.number="tmpDetails.alimonyPerChild"/>
    <q-input label="תשלום מדור חודשי" type="number" v-model.number="tmpDetails.mador"/>
    <q-input label="תשלום חודשי ממוצע לילד במעון" type="number" v-model.number="tmpDetails.maon"/>
    <q-input label="תשלום חודשי ממוצע לילד בגן" type="number" v-model.number="tmpDetails.kindergaten"/>
    <q-input label="תשלום חודשי ממוצע לילד ביסודי" type="number" v-model.number="tmpDetails.elementarySchool"/>
    <q-input label="תשלום חודשי ממוצע לילד בתיכון" type="number" v-model.number="tmpDetails.highSchool"/>
    <q-input label="ממוצע מחציות לגרושה חודשי" type="number" v-model.number="tmpDetails.divorceeExpens"/>
    <q-btn @click="updateArr(`assets`)">הוסף נכס/חיסכון</q-btn>
    <div v-if="assets.length>0">
      <div>פרטי הנכסים:</div>
      <div v-for="(asset, index) in assets" :asset="asset">
        <q-input label="שם" v-model:value="asset.name"/>
        <q-input label="שווי הנכס" type="number" v-model.number="asset.value"/>
        <q-input label="תשואה חודשית" type="number" v-model.number="asset.monthlyReturn"/>
        <q-btn @click="updateArr('assets', index)">הסר נכס</q-btn>
        <br>
      </div>
    </div>
    <q-btn @click="updateArr(`debts` )">הוסף חוב</q-btn>
    <div v-if="debts.length>0">
      <div>פרטי חובות:</div>
      <div v-for="(debt,index) in debts" :debt="debt" :index="index">
        <q-input label="שם" v-model:value="debt.name"></q-input>
        <q-input label="שווי" type="number" v-model.number="debt.amount"></q-input>
        <q-input label="תשואה חודשית" type="number" v-model.number="debt.monthlyPayment"></q-input>
        <q-btn @click="updateArr('debts', index)">הסר חוב</q-btn>
        <br>
      </div>
    </div>
    <br>
    <q-btn @click="updateDetails(tmpDetails)">עדכן פרטים</q-btn>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: "UpdateFinancialDetails",
  data: function () {
    return {
      tmpDetails: {},
      debts: [],
      assets: [],
    }
  },
  computed: {
    ...mapState('financialDetails', ['financialDetails']),
    ...mapState('personalDetails', ['personalDetails'])
  },
  methods: {
    ...mapActions('personalDetails',['getPersonalDetails']),
    ...mapActions('financialDetails', ['getFinancialDetails', 'updateFinancialDetails']),
    updateDetails() {
      const childrenAtHome = this.personalDetails.childrenAtHome;

      this.tmpDetails.assets = this.assets;
      this.tmpDetails.debts = this.debts;
      this.tmpDetails.madorFor3children =
          ((childrenAtHome >= 3) ? 1 :
              (childrenAtHome == 2) ? 1.25 :
                  (childrenAtHome == 1) ? 1.66 : 0) * this.tmpDetails.mador;
      this.updateFinancialDetails(this.tmpDetails)
    },
    updateArr(arr, index) {
      if (index === undefined) {
        this[arr].push({});
      } else {
        this[arr].splice(index, 1)
      }
    },
  },
  async created() {
    await this.getPersonalDetails();
    await this.getFinancialDetails();
    this.tmpDetails = JSON.parse(JSON.stringify(this.financialDetails));
    this.assets = JSON.parse(JSON.stringify(this.financialDetails.assets));
    this.debts = JSON.parse(JSON.stringify(this.debts, this.financialDetails.debts));
  }
}
</script>

<style scoped>

</style>
