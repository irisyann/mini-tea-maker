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
        <v-btn color="primary" class="mt-16" @click="stepCounter++">💧 Add water</v-btn>
      </div>

      <div v-if="stepCounter == 2" class="d-flex flex-column align-center">
        <CupWithWater/>
        <v-btn color="primary" class="mt-16" @click="stepCounter++">🔥 Heat up</v-btn>
      </div>

      <div v-if="stepCounter == 3" class="d-flex flex-column align-center">
        <CupWithBoilingWater/>
        <v-btn color="primary" class="mt-16" @click="triggerSteepTimer()">Add tea bag</v-btn>
      </div>

      <div v-if="stepCounter == 4" class="d-flex flex-column align-center">
        <SteepTeabag1 v-if="steepTimer > 4 && steepTimer <= 6"/>
        <SteepTeabag2 v-if="steepTimer > 2 && steepTimer <= 4"/>
        <SteepTeabag3 v-if="steepTimer <= 2"/>
        <div class="mt-10" v-if="steepTimer > 0">Steeping tea bag...</div>
        <div v-if="steepTimer == 0" class="mt-10">Perfect!</div>
        <v-btn color="primary" v-if="steepTimer == 0" class="mt-16" @click="stepCounter++">Next</v-btn>
      </div>

      <div v-if="stepCounter == 5" class="d-flex flex-column align-center">
        <SteepTeabag3/>

        <div class="mt-10 mb-3 font-weight-bold">🧁 Add sugar</div>
        <div class="d-flex">
          <v-btn :disabled="tooMuchSugarMessage" color="primary" class="mr-3" @click="addSugar(1)">
            <SpoonSugar1 />
          </v-btn>
          <v-btn :disabled="tooMuchSugarMessage" color="primary" class="mr-3" @click="addSugar(2)">
            <SpoonSugar2 />
          </v-btn>
          <v-btn :disabled="tooMuchSugarMessage" color="primary" @click="addSugar(3)">
            <SpoonSugar3 />
          </v-btn>
        </div>

        <div v-if="sugarAddedMessage" class="mt-5">Sugar added!</div>
        <v-sheet v-if="tooMuchSugarMessage" class="mt-5 pa-3 rounded-lg text-red" color="red-lighten-4">
          <div class="font-italic">Whoa that's way too much sugar CALM DOWN</div>
        </v-sheet>

        <v-btn color="primary" class="mt-16" @click="stepCounter++">Next</v-btn>
      </div>

      <div v-if="stepCounter == 6" class="d-flex flex-column align-center">
        <div class="mt-2 mb-3 font-weight-bold">🥛 Add milk</div>
        <v-btn :disabled="tooMuchMilkMessage" color="primary" class="mb-10" height="100px" @click="addMilk()">
          <MilkJug />
        </v-btn>

        <SteepTeabag3 v-if="milkCount < 1"/>
        <WithMilk1 v-if="milkCount >=1 && milkCount < 2"/>
        <WithMilk2 v-if="milkCount >=3"/>

        <div v-if="milkAddedMessage" class="mt-5">Milk added!</div>
        <v-sheet v-if="tooMuchMilkMessage" class="mt-5 pa-3 rounded-lg text-red" color="red-lighten-4">
          <div class="font-italic">All the cows in the world are dried up thanks to you 🐄</div>
        </v-sheet>

        <v-btn color="primary" class="mt-16" @click="stepCounter++">Final step</v-btn>
      </div>

      <div v-if="stepCounter == 7" class="d-flex flex-column align-center">

        <SmokeLines class="mb-2 mr-2"/>

        <div style="z-index: 1">
          <SteepTeabag3 v-if="milkCount < 1"/>
          <WithMilk1 v-if="milkCount >=1 && milkCount < 2"/>
          <WithMilk2 v-if="milkCount >=3"/>
        </div>

        <SaucerPlate class="mr-1 mt-n5"/>

        <div class="mt-10 font-weight-bold">Enjoy your tea!</div>

        <v-btn color="primary" class="mt-16" @click="startOver">Start over</v-btn>
      </div>
    </div>

    <v-btn color="primary" v-if="stepCounter == 0" class="mt-16" @click="stepCounter++">Start</v-btn>
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
      milkAddedMessage: false,
      tooMuchSugarMessage: false,
      tooMuchMilkMessage: false,
      sugarCount: 0,
      milkCount: 0,
    }
  },

  methods: {
    startOver() {
      this.stepCounter = 1
      this.steepTimer = 6
      this.sugarAddedMessage = false
      this.milkAddedMessage = false
      this.tooMuchSugarMessage = false
      this.tooMuchMilkMessage = false
      this.sugarCount = 0
      this.milkCount = 0
    },

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

      if (this.milkCount > 5) {
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
