<template>
  <div class="home">
    <div>
      <h3>ברוך הבא</h3>
      <p> שלום {{ user.displayName }}</p>
      <PersonalDetails/>
      <q-btn @click="signOut()">התנתק</q-btn>
      <router-link to="/updatePersonalDetails">
        <q-btn>עדכון פרטים</q-btn>
      </router-link>
      <router-link to="/updateFinancialDetails">
        <q-btn>מצב כלכלי</q-btn>
      </router-link>
      <router-link to="/summaryTable">
        <q-btn>סיכום תשלומים</q-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import inputUser from "@/components/PersonalDetails";
import PersonalDetails from "@/components/PersonalDetails";
import firebaseInstance from "@/middleware/firebase";
import {mapMutations} from 'vuex';

export default {
  name: 'Home',
  data: function () {
    return {
      user: "",
    }
  },
  components: {
    PersonalDetails,
    inputUser
  },
  methods: {
    ...mapMutations('personalDetails',['initPersonalDetails']),
    ...mapMutations('financialDetails',['initFinancialDetails']),
    signOut() {
      window.user=null;
      firebaseInstance.firebase.auth().signOut().then(() => {
        this.initPersonalDetails();
        this.initFinancialDetails();
        this.user = window.user = null;
        this.$router.push('/');
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
    }
  },
  created() {
    this.user = window.user;
  }
}

</script>
