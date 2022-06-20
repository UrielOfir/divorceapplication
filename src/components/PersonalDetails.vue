<template>
  <div>
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="imgSrc">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{personalDetails.firstName }} {{ personalDetails.lastName }}</q-item-label>
          <q-item-label caption>
            {{ personalDetails.address.city }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator/>

      <q-card-section horizontal>
        <q-card-section>
          תאריך לידה:
          <br>
          {{ personalDetails.birthday }}
        </q-card-section>

        <q-separator vertical/>

        <q-card-section class="col-4">
          ילדים:
          <br>
          <div v-for="child in personalDetails.children">
            {{ child.name }}, כיתה: {{ child.currentGrade }} <br>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>


  </div>

</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: "PersonalDetails",
  data: function () {
    return {
      imgSrc: window.user.photoURL,
    }
  },
  computed: {
    ...mapState('personalDetails', ['personalDetails']),

  },
  methods: mapActions('personalDetails', ['getPersonalDetails']),
  async created() {
    await this.getPersonalDetails();
  },
}

</script>

<style scoped>

</style>
