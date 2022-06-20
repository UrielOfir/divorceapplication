<template>
  <div>
    <div>
      <h3>חישוב החובות</h3>
      <h5> סכום החוב הכולל: {{ totalDebtString }}</h5>
    </div>
    <financial-chart
        v-if="yearsRows[0]"
        :debts="debtCalculation"
        :yearlyDebt="yearlyDebt"
        :currentYear="yearsRows[0].year"
        :alimonyLastYear="yearsRows[yearsRows.length-1].year"/>
    <div class="q-pa-md">
      <FinancialTable
          :yearsRows="yearsRows"
      />

    </div>

  </div>

</template>

<script>
import calculator from '../middleware/calculator';
import FinancialChart from "@/components/FinancialChart";
import FinancialTable from "@/components/FinancialTable"
import {mapActions, mapState} from 'vuex';


export default {
  name: "FinancialSummary",
  components: {FinancialChart, FinancialTable},
  data: function () {
    return {
      years: [],
      yearlyDebt: [],
      debtCalculation: {totalDebt: 0, years: {}, average: 0},
      yearsRows: [],
      totalDebtString:"",
    }
  },
  computed: {
    ...mapState('personalDetails', ['personalDetails']),
    ...mapState('financialDetails', ["financialDetails"])
  },
  methods: {
    ...mapActions('debts', ['updateDebts']),
    ...mapActions('personalDetails', ['getPersonalDetails']),
    ...mapActions('financialDetails', ['getFinancialDetails']),
    dataBuilder(data) {
      for (let year in data.years) {
        let row = {
          year,
          alimony: data.years[year].alimony,
          mador: data.years[year].mador,
          divorceeExpens: data.years[year].divorceeExpens,
          education: data.years[year].education,
          totalDebt: data.years[year].totalDebt,
        }
        for (let child in data.years[year].children) {
          row[data.years[year].children[child].name] = data.years[year].children[child].institution;
        }
        this.yearlyDebt.push(data.years[year].totalDebt);
        this.years.push(Number(year));
        this.yearsRows.push(row);
      }
      this.years.push(this.years[this.years.length - 1] + 1);
    },
  },
  async created() {
    await this.getPersonalDetails();
    await this.getFinancialDetails();
    this.debtCalculation = calculator.calculateAllYears(this.personalDetails, this.financialDetails);
    this.totalDebtString = new Number(this.debtCalculation.totalDebt).toLocaleString();
    await this.updateDebts(this.debtCalculation);
    this.dataBuilder(this.debtCalculation);
  }
}
</script>


<style scoped>

</style>
