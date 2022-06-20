<template>
  <div>
    <div>
      <apexchart height="600px" :options="options" :series="series"></apexchart>
    </div>
    <div> חישוב הלוואה ארוכת טווח
      <q-btn @click="changeData()">הצג טבלה מעודכנת</q-btn>
      <q-input label="החזר חודשי" v-model:value="monthlyLoanPayment"/>
      <q-input label="החזר על כל שקל" v-model:value="interest"/>
      <div> תאריך סיום תשלום החוב:
        {{ finishLoanDate }}
      </div>
      <div> מספר חודשים לסיום החוב:
        {{ loanMonths }}
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import {mapActions, mapState} from 'vuex';

export default {
  components: {'apexchart': VueApexCharts},
  name: "financialChart",
  props: ['debts', 'yearlyDebt', 'alimonyLastYear', 'currentYear'],
  data: function () {
    return {
      years: [Number(this.currentYear)],
      monthlyIncome: 0,
      monthlyLoanPayment: 5000,
      interest: 1.3,
      loanFinish: new Date(),
      loanMonths: 0,
      options: {
        chart: {
          id: 'תשלומים לגרושה'
        },
        xaxis: {
          categories: [],
        },
      },

      series: [{
        name: 'תשלום שנתי',
        data: [],
      },
        {
          name: 'תשלום ממוצע',
          data: [],
        },
        {
          name: 'החזר הלוואה שנתי',
          data: [],
        }
      ],

    }
  },
  computed: {
    ...mapState('financialDetails', ['financialDetails']),
    finishLoanDate: function () {return `${this.loanFinish.getMonth()}-${this.loanFinish.getFullYear()}`}
  },
  methods: {
    ...mapActions('financialDetails', ['getFinancialDetails']),
    changeData() {
      this.loanCalculator();
      this.series = [
        {name: 'תשלום שנתי', data: this.yearlyDebt},
        {name: 'ממוצע שנתי', data: Array(this.yearlyDebt.length - 1).fill(this.debts.average)},
        {name: 'החזר הלוואה שנתי', data: Array(this.years.length).fill(this.monthlyLoanPayment * 12)},
        {name: 'הכנסה שנתית', data: Array(this.years.length).fill(this.montlyIncome * 12)}
      ];
      this.options = {chart: {id: 'תשלומים לגרושה'}, type: 'column', xaxis: {categories: this.years}};
    }
    ,
    loanCalculator() {
      this.loanMonths = (this.debts.totalDebt * this.interest) / this.monthlyLoanPayment;
      this.loanMonths = Math.round(this.loanMonths);
      this.loanFinish = new Date;
      this.loanFinish.setMonth(new Date().getMonth() + this.loanMonths);
      if (this.loanFinish.getFullYear() > this.alimonyLastYear) {
        const thisYear = this.years[0];
        this.years = [thisYear];
        for (let i = 0; this.years[i] < this.loanFinish.getFullYear(); i++) {
          this.years.push(this.years[i] + 1);
        }
      } else {
        const thisYear = this.years[0];
        this.years = [thisYear];
        for (let i = 0; this.years[i] < this.alimonyLastYear; i++) {
          this.years.push(this.years[i] + 1);
        }
      }
    }
  }
  ,
  async created() {
    await this.getFinancialDetails();
    this.montlyIncome = this.financialDetails.income;
    this.changeData();
  }
}
</script>

<style scoped>

</style>
