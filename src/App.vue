<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="menu"
        />

        <q-toolbar-title>
          צועדים קדימה
        </q-toolbar-title>
        <router-link to="/home">
          <q-btn>לעמוד הבית</q-btn>
        </router-link>
        <div>מגירושין לצמיחה</div>
      </q-toolbar>
    </q-header>
    <!--    show-if-above, was in q-drawer if you what it to be open at the start -->
    <q-drawer
        v-model="leftDrawerOpen"

        bordered
        content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>תפריט</q-item-label>
        <q-item clickable tag="a" to="/home">
          <q-item-section avatar>
            <q-icon name="home"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>דף הבית</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/UpdatePersonalDetails">
          <q-item-section avatar>
            <q-icon name="account_box"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>פרטים אישיים</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a"  to="/updateFinancialDetails">
          <q-item-section avatar>
            <q-icon name="account_balance"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>הזנת נתונים כלכליים</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a"  to="/SummaryTable">
          <q-item-section avatar>
            <q-icon name="timeline" icon="timeline"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>חישוב החובות</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-image">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>


</style>
