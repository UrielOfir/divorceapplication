<template>
  <div>
    <q-table
        title="חישוב תשלומים לפי שנים"
        :data="yearsRows"
        row-key="name"
        :pagination.sync="pagination"
        :columns="columns">
      <template v-slot:body="props">
        <q-tr :props="props">
          <td>{{ props.row.year }}</td>
          <td>{{ props.row.alimony }}</td>
          <td>{{ props.row.mador }}</td>
          <td>{{ props.row.divorceeExpens }}</td>
          <td>{{ props.row.education }}</td>
          <td>{{ props.row.totalDebt }}</td>
          <td v-for="child of personalDetails.children"
              :style="background(props.row[child.name])">
            {{ props.row[child.name] }}
          </td>
        </q-tr>
      </template>
    </q-table>
    <q-btn @click="buildColumns">רענון טבלה</q-btn>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: ['yearsRows'],
  name: "FinancialTable",
  data: function () {
    return {
      pagination: {
        rowsPerPage: 20 // current rows per page being displayed
      },
      columns: [
        {name: 'year', label: 'שנה', field: 'year', align: 'center'},
        {name: 'alimony', label: 'מזונות', field: 'alimony', align: 'left'},
        {name: 'mador', label: 'מדור', field: 'mador', align: 'left'},
        {name: 'divorceeExpens', label: 'מחציות', field: 'divorceeExpens', align: 'left'},
        {name: 'education', label: 'חינוך', field: 'education', align: 'left'},
        {name: 'totalDebt', label: 'סה"כ', field: 'totalDebt', align: 'left'},
      ],
    }
  },
  methods: {
    background(institution) {
      if (institution === 'בוגר/ת')
        return "background-color: #21BA45"
      else if (institution === 'צבא') {
        return "background-color: yellow"
      } else return "background-color: #c72b00"
    },
    buildColumns() {
      let goodColumns = [
        {name: 'year', label: 'שנה', field: 'year', align: 'left'},
        {name: 'alimony', label: 'מזונות', field: 'alimony', align: 'left'},
        {name: 'mador', label: 'מדור', field: 'mador', align: 'left'},
        {name: 'divorceeExpens', label: 'מחציות', field: 'divorceeExpens', align: 'left'},
        {name: 'education', label: 'חינוך', field: 'education', align: 'left'},
        {name: 'totalDebt', label: 'סה"כ', field: 'totalDebt', align: 'left'},
      ];
      for (let child of this.personalDetails.children) {
        goodColumns.push({name: child.name, label: child.name, field: child.name, align: 'left'});
      }
      this.columns = goodColumns;
      console.log(this.columns);
    }
  },
  computed: mapState('personalDetails', ['personalDetails']),
  created() {
    this.buildColumns();
  }
}
</script>


<style scoped>

</style>
