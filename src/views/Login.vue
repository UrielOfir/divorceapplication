<template>
  <div>
    <div v-if="!firstEntry">
      <div>
        <q-btn @click="guest()"> היכנס כאורח</q-btn>
      </div>
      <q-btn @click="loginGoogle()">התחבר עם חשבון גוגל</q-btn>
      <div>כניסה עם מייל וסיסמא</div>
      <q-input label="email" v-model:value="email"/>
      <q-input label="password" v-model:value="password"/>
      <q-btn @click="loginEmail()">התחבר עם מייל וסיסמא</q-btn>
      <div>
        <q-btn @click="firstEntry=true">להרשמה באמצעות מייל וסיסמא</q-btn>
      </div>
    </div>
    <div v-else>
      <div>הרשמה עם מייל וסיסמא</div>
      <q-input label="email" v-model:value="email"/>
      <q-input label="password" v-model:value="password"/>
      <q-btn @click="loginEmail(`subscribe`)">הירשם עם מייל וסיסמא</q-btn>
    </div>
    <div v-else>
      <p :userLogged="userLogged">מחובר {{ userLogged }}</p>
    </div>
  </div>

</template>

<script>
import firebaseInstance from "../middleware/firebase"

export default {
  name: "Login",
  components: {},
  data: function () {
    return {
      userLogged: "",
      firstEntry: false,
      email: "",
      password: "",
    }
  },
  methods: {
    guest() {
      let uid = JSON.parse(JSON.stringify(new Date().getTime()));
      this.loginEmail('guest')
    },
    loginGoogle() {
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      firebaseInstance.firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            this.connectFinished(result.user);

            // ...
          }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      // }
    },
    loginEmail(action) {
      if (action === `subscribe`) {
        firebaseInstance.firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              // Signed in
              this.connectFinished(userCredential.user);
            })
            .catch((error) => {
              console.log(error)
              var errorCode = error.code;
              var errorMessage = error.message;
              // ..

            });
      } else if (action === 'guest') {
        firebaseInstance.firebase.auth().signInAnonymously()
            .then((userCredential) => {
              // Signed in..
              this.connectFinished(userCredential.user);
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            });
      } else {
        firebaseInstance.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              // Signed in
              this.connectFinished(userCredential.user);
              // ...
            })
            .catch((error) => {
              console.log(error)
              var errorCode = error.code;
              var errorMessage = error.message;
            });
      }
    },
    connectFinished(user) {
      window.user = user;
      this.$router.push(`/home`);
    }
  },
  created() {
    if (window.user) {
      this.userLogged = window.user.displayName;
    }
  }
}

</script>

<style scoped>

</style>
