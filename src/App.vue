<template>
  <div id="app">

    <div class="text-h4 text-center mb-10 font-weight-bold">Mini Tea Maker</div>

    <div>
      <div v-if="stepCounter == 0" class="d-flex flex-column align-center">
        <SmokeLines class="mb-2 mr-2"/>
        <SteepTeabag3 style="z-index: 1"/>
        <SaucerPlate class="mr-1 mt-n3"/>
      </div>

      <div v-if="stepCounter == 1" class="d-flex flex-column align-center">
        <EmptyCup/>
        <v-btn class="mt-16" @click="stepCounter++">Add water</v-btn>
      </div>

      <div v-if="stepCounter == 2" class="d-flex flex-column align-center">
        <CupWithWater/>
        <v-btn class="mt-16" @click="stepCounter++">Heat up</v-btn>
      </div>

      <div v-if="stepCounter == 3" class="d-flex flex-column align-center">
        <CupWithBoilingWater/>
        <v-btn class="mt-16" @click="triggerSteepTimer()">Add tea bag</v-btn>
      </div>

      <div v-if="stepCounter == 4" class="d-flex flex-column align-center">
        <SteepTeabag1 v-if="steepTimer > 4 && steepTimer <= 6"/>
        <SteepTeabag2 v-if="steepTimer > 2 && steepTimer <= 4"/>
        <SteepTeabag3 v-if="steepTimer <= 2"/>
        <div class="mt-10" v-if="steepTimer > 0">Steeping tea bag...</div>
        <v-btn v-if="steepTimer == 0" class="mt-16" @click="stepCounter++">Add sugar</v-btn>
      </div>

      <div v-if="stepCounter == 5" class="d-flex flex-column align-center">
        <SteepTeabag3/>
        <div class="d-flex mt-10">
          <v-btn class="mr-3" @click="addSugar(1)">
            <SpoonSugar1 />
          </v-btn>
          <v-btn class="mr-3" @click="addSugar(2)">
            <SpoonSugar2 />
          </v-btn>
          <v-btn @click="addSugar(3)">
            <SpoonSugar3 />
          </v-btn>
        </div>

        <div v-if="sugarAddedMessage" class="mt-5">Sugar added!</div>
        <div v-if="tooMuchSugarMessage" class="mt-5">Whoa that's way too much sugar CALM DOWN</div>

        <v-btn class="mt-16" @click="stepCounter++">Add milk</v-btn>
      </div>

      <div v-if="stepCounter == 6" class="d-flex flex-column align-center">
        <v-btn class="mt-10 mb-10" height="100px" @click="addMilk()">
          <MilkJug />
        </v-btn>

        <SteepTeabag3 v-if="milkCount < 3"/>
        <WithMilk1 v-if="milkCount >=3 && milkCount < 6"/>
        <WithMilk2 v-if="milkCount >=6"/>

        <div v-if="milkAddedMessage" class="mt-5">Milk added!</div>
        <div v-if="tooMuchMilkMessage" class="mt-5">All the cows in the world are dried up thanks to you</div>

        <v-btn class="mt-16" @click="stepCounter++">Final step</v-btn>
      </div>

      <div v-if="stepCounter == 7" class="d-flex flex-column align-center">

        <SmokeLines class="mb-2 mr-2"/>

        <div style="z-index: 1">
          <SteepTeabag3 v-if="milkCount < 3"/>
          <WithMilk1 v-if="milkCount >=3 && milkCount < 6"/>
          <WithMilk2 v-if="milkCount >=6"/>
        </div>

        <SaucerPlate class="mr-1 mt-n5"/>

        <div class="mt-10 font-weight-bold">Enjoy your tea!</div>

        <v-btn class="mt-16" @click="stepCounter = 1">Start over</v-btn>
      </div>
    </div>

    <v-btn v-if="stepCounter == 0" class="mt-16" @click="stepCounter++">Start</v-btn>
  </div>
</template>

<script>
/* eslint-disable */
import EmptyCup from './components/EmptyCup.vue';
import CupWithWater from './components/CupWithWater.vue';
import CupWithBoilingWater from './components/CupWithBoilingWater.vue';
import SteepTeabag1 from './components/SteepTeabag1.vue';
import SteepTeabag2 from './components/SteepTeabag2.vue';
import SteepTeabag3 from './components/SteepTeabag3.vue';
import SpoonSugar1 from './components/SpoonSugar1.vue';
import SpoonSugar2 from './components/SpoonSugar2.vue';
import SpoonSugar3 from './components/SpoonSugar3.vue';
import WithMilk1 from './components/WithMilk1.vue';
import WithMilk2 from './components/WithMilk2.vue';
import MilkJug from './components/MilkJug.vue';
import SaucerPlate from './components/SaucerPlate.vue';
import SmokeLines from './components/SmokeLines.vue';

export default {
  name: 'App',
  components: {
    EmptyCup,
    CupWithWater,
    CupWithBoilingWater,
    SteepTeabag1,
    SteepTeabag2,
    SteepTeabag3,
    SpoonSugar1,
    SpoonSugar2,
    SpoonSugar3,
    WithMilk1,
    WithMilk2,
    MilkJug,
    SaucerPlate,
    SmokeLines
  },

  data() {
    return {
      stepCounter: 0,
      steepTimer: 6,
      sugarAddedMessage: false,
      tooMuchSugarMessage: false,
      sugarCount: 0,
      milkCount: 0,
    }
  },

  methods: {
    triggerSteepTimer() {
      this.stepCounter++
      this.steepTimerCountdown()
    },

    steepTimerCountdown() {
      this.steepTimer--;
      if (this.steepTimer > 0) {
        setTimeout(this.steepTimerCountdown, 1000);
      }
    },

    addSugar(sugarCount) {
      this.sugarAddedMessage = true
      this.sugarCount += sugarCount

      if (this.sugarCount > 10) {
        this.tooMuchSugarMessage = true
      }

      setTimeout(() => {
        this.sugarAddedMessage = false
      }, 1000)
    },

    addMilk() {
      this.milkAddedMessage = true
      this.milkCount++

      if (this.milkCount > 10) {
        this.tooMuchMilkMessage = true
      }

      setTimeout(() => {
        this.milkAddedMessage = false
      }, 1000)
    }
  },
}
</script>

<style>
#app, body, html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #F8F3CD;
}
</style>
