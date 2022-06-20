<template>
  <div>
    <h4>עדכון פרטים</h4>
    <q-input label="שם פרטי" v-model:value="tmpDetails.firstName"/>
    <q-input label="שם משפחה" v-model:value="tmpDetails.lastName"/>
    <q-input label="תאריך לידה" v-model:value="tmpDetails.birthday" type="date"/>
    <div>כתובת</div>
    <q-input label="עיר/יישוב" v-model:value="tmpDetails.address.city"/>
    <q-input label="רחוב" v-model:value="tmpDetails.address.street"/>
    <q-input label="מספר בית" v-model:value="tmpDetails.address.houseNumber"/>
    <q-btn @click="addChild(`add` )">הוסף ילד</q-btn>
    <div>
      <div>פרטי הילדים:</div>
      <div v-for="(child, index) in tmpChildren" :child="child">
        <q-card class="my-card">
          <q-card-section>
            <q-input label="שם" v-model:value="child.name"/>
            <div class="q-gutter-sm">
              <q-radio v-model="child.gender" val="male" label="בן"/>
              <q-radio v-model="child.gender" val="female" label="בת"/>
            </div>
            <q-input label="תאריך לידה" v-model:value="child.birthday" type="date" style="max-width: 300px"></q-input>
            <div> כיתה נוכחית:
              <q-select v-model="child.currentGrade" :options="gradeOptions" style="max-width: 300px"
                        @input="updateFirstGrade(child)"></q-select>
            </div>
            <q-btn @click="deleteChild(index)">הסר ילד</q-btn>
            <br>
          </q-card-section>
        </q-card>
        <q-dialog v-model="confirmFirstGrade" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm">האם {{ checkChild.name }} עולה שנה הבאה לכיתה א?</span>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="כן" color="primary" v-close-popup/>
              <q-btn flat label="לא" @click="checkchild.firstGradeYear++" color="primary" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <br>
      </div>

    </div>
    <br>
    <q-btn @click="sendDetails()">עדכן פרטים</q-btn>
  </div>
</template>

<script>
import gematriya from 'gematriya';
import calculator from '../middleware/calculator'
import {mapState, mapActions} from 'vuex'

export default {
  name: "UpdatePersonalDetails",
  data: function () {
    return {
      confirmFirstGrade: false,
      checkChild: {name: {}},
      tmpDetails: {
        firstName: "",
        lastName: "",
        birthday: "",
        address: {},
        children: [],
      },
      tmpChildren: [],
      gradeOptions: ['מעון', 'גן', 'טרום חובה', 'גן חובה', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'יא', 'יב', 'צבא', 'אחרי צבא']
    }
  },
  computed: mapState('personalDetails', ['personalDetails']),
  methods: {
    ...mapActions('personalDetails', ['getPersonalDetails', 'updateDetails']),
    sendDetails() {
      this.tmpChildren.sort((A, B) => A.firstGradeYear - B.firstGradeYear);
      let childrenAtHome = this.tmpChildren.length;
      for (let child of this.tmpChildren) {
        if (child.currentGrade === 'צבא' || child.currentGrade === 'אחרי צבא') {
          childrenAtHome--;
        }
      }
      this.tmpDetails.childrenAtHome = childrenAtHome;
      this.tmpDetails.children = this.tmpChildren;
      this.updateDetails(this.tmpDetails);
    },
    addChild() {
      this.tmpChildren.unshift({});
    },
    deleteChild(index) {
      this.tmpChildren.splice(index, 1)
    },
    updateFirstGrade(child) {
      let currentGrade = gematriya(child.currentGrade);
      if (currentGrade >= 1 && currentGrade <= 12) {
        child.firstGradeYear = calculator.currentStudyYear() - currentGrade + 1;
      }// +1 because we count whole year from the first day
      else {
        // first grade calculation by birthday
        const date = new Date(child.birthday);
        child.firstGradeYear = date.getFullYear() + 6;
        if (child.currentGrade === 'גן חובה') {
          this.checkChild = child;
          this.confirmFirstGrade = true;
        }
      }
    },

  },
  async created() {
    await this.getPersonalDetails();
    if (this.personalDetails) {
      this.tmpDetails = JSON.parse(JSON.stringify(this.personalDetails));
      this.tmpChildren = JSON.parse(JSON.stringify(this.personalDetails.children));
    }
  }
}
</script>

<style scoped>
.my-card {
  background: #65c0ff;
}

</style>
