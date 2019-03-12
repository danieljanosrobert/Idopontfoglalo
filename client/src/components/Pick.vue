<template>
  <div>
    <h1 class="mb-3 mt-3">Időpontok</h1>
    <br />
    <div>
      <button @click="addss()" class="btn btn-info">Kiss Doktor</button>
      <button @click="addss2()" class="btn btn-info">Nagy Doktor</button>
      <hr style="width: 100%">
      <br />
      <br />
      <div class="row">
        <div class="cd-schedule" v-bind:class="[isJsFull?'js-full':'',{ hidden: isLoading }]" ref="schedule">
          <div class="timeline">
            <ul ref="timeline">
              <li><span>09:00</span></li>
              <li><span>09:30</span></li>
              <li><span>10:00</span></li>
              <li><span>10:30</span></li>
              <li><span>11:00</span></li>
              <li><span>11:30</span></li>
              <li><span>12:00</span></li>
              <li><span>12:30</span></li>
              <li><span>13:00</span></li>
              <li><span>13:30</span></li>
              <li><span>14:00</span></li>
              <li><span>14:30</span></li>
              <li><span>15:00</span></li>
              <li><span>15:30</span></li>
              <li><span>16:00</span></li>
              <li><span>16:30</span></li>
              <li><span>17:00</span></li>
              <li><span>17:30</span></li>
              <li><span>18:00</span></li>
            </ul>
          </div> <!-- .timeline -->

          <div class="events">
            <ul>
              <li class="events-group" v-for="(nap) in napok" :key="nap.id">
                <div class="top-info" ref="days"><span>{{nap.nap}}</span></div>

                <ul>
                  <li class="single-event" data-start="09:30" data-end="10:30" data-content="event-abs-circuit" data-event="event-1">
                    <a href="#0">
                    </a>
                  </li>

                  <li class="single-event" data-start="11:00" data-end="12:30" data-content="event-rowing-workout" data-event="event-2">
                    <a href="#0">
                    </a>
                  </li>

                  <li class="single-event" data-start="14:00" data-end="15:15"  data-content="event-yoga-1" data-event="event-3">
                    <a href="#0">
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        <div class="cover-laye56r"></div>
      </div> <!-- .cd-schedule -->

        <div v-bind:style="{visibility: cardVisibility}" class="col-6 col-md-4" v-for="(raeres) in raeresek[0].raeresek" :key="raeres.nap">
          <div class="card text-white bg-primary mb-3" style="max-width: 20rem;" >
            <div class="card-header">nap: {{raeres.nap}} </div>
            <div class="card-body">
              <h4 class="card-title">Kezdés: {{raeres.kezdeti_idopont}}</h4>
              <p class="card-text"> Végzés: {{raeres.veg_idopont}}
                <br />
                <small>Időköz: {{raeres.idokoz}}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import timeline from '../assets/js/main.js'
import AuthenticationService from '@/services/AuthenticationService'
import helperFunctions from '@/functions/helperFunctions'

export default {
  name: 'Time',
  data: () => ({
    cardVisibility: 'hidden',
    napok: [ { id: 1, nap: 'Hétfő' },
      { id: 2, nap: 'Kedd' },
      { id: 3, nap: 'Szerda' },
      { id: 4, nap: 'Csütörtök' },
      { id: 5, nap: 'Péntek' },
      { id: 6, nap: 'Szombat' },
      { id: 7, nap: 'Vasárnap' }
    ],
    raeresek: [{raeresek: [{nap: null, kezdeti_idopont: null, veg_idopont: null, idokoz: null}]}],
    /* Session */
    doc: '',
    /* Schedule variables */
    isLoading: true,
    areChildrenSetUp: false,
    deltaTime: 0,
    // eventWrapper : null
    eventGroup: [],
    singleEvents: [],
    startOfTimeline: 0,
    eventSlotHeight: 0,
    isJsFull: false
  }),
  mounted () {
    if (!helperFunctions.isAunthicated()) {
      this.$session.set('redirect', 'timetable')
      this.$router.push('/login')
    }
    this.fetch()
    this.schedulePlan()
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)

      // Init
      this.getWindowWidth()
    })
  },
  updated () {
    if (this.$session.get('doc') !== undefined) {
      this.cardVisibility = 'visible'
    }
    /* for (var x in this.raeresek[0].raeresek) {
      console.log('c: ' + this.raeresek[0].raeresek[x].idokoz)
    } */
  },
  methods: {
    initEvents () {
      for (let i = 0; i < this.singleEvents.length; i++) {
        let self = this.singleEvents[i]
        let dateSpan = document.createElement('span')
        let label = self.getAttribute('data-start') + ' - ' + self.getAttribute('data-end')
        dateSpan.innerHTML = label
        dateSpan.setAttribute('class', 'event-date')
        self.children[0].prepend(dateSpan)
      }
    },
    placeEvents () {
      for (let i = 0; i < this.singleEvents.length; i++) {
        this.eventSlotHeight = this.$refs.days[0].offsetHeight
        let self = this.singleEvents[i]

        let start = this.getScheduleTimeStamp(self.getAttribute('data-start'))
        let eventLength = this.getScheduleTimeStamp(self.getAttribute('data-end')) - start

        let topLocation = this.eventSlotHeight * (start - this.startOfTimeline) / this.deltaTime
        let selfHeight = this.eventSlotHeight * eventLength / this.deltaTime

        self.setAttribute('style', 'top: ' + (topLocation - 1) + 'px; height: ' + (selfHeight + 1) + 'px')
      }
    },
    getWindowWidth (event) {
      this.scheduleReset()
    },
    scheduleReset () {
      let layout = this.getLayout()
      if (layout === 'desktop' && !this.isJsFull) {
        this.isJsFull = true
        this.placeEvents()
      } else if (layout === 'mobile' && this.isJsFull) {
        this.isJsFull = false
        for (let i = 0; i < this.singleEvents.length; i++) {
          this.singleEvents[i].removeAttribute('style')
        }
        // TODO: this.eventsGroup.children('ul').add(this.singleEvents).removeAttr('style');
      }
      this.isLoading = false
    },
    getLayout () {
      return (window.getComputedStyle(this.$refs.schedule, '::before').getPropertyValue('content')).slice(1, -1)
    },
    getScheduleTimeStamp (time) {
      let timeArray = time.split(':')
      let timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1])
      return timeStamp
    },
    schedulePlan () {
      /* opening hour (540) */
      this.startOfTimeline = this.getScheduleTimeStamp(this.$refs.timeline.children[0].textContent)
      this.deltaTime = this.getScheduleTimeStamp(this.$refs.timeline.children[1].textContent) - this.startOfTimeline
      this.eventGroup = this.$refs.schedule.children[1].children[0].children
      if (!this.areChildrenSetUp) {
        this.setUpChildren()
      }
      this.scheduleReset()
      this.initEvents()
    },
    setUpChildren () {
      this.areChildrenSetUp = true
      for (let index = 0; index < this.eventGroup.length; index++) {
        /* for each child */
        for (let j = 0; j < this.eventGroup[index].children[1].children.length; j++) {
          this.singleEvents.push(this.eventGroup[index].children[1].children[j])
        }
      }
    },
    async fetch () {
      if (this.$session.get('doc') !== undefined) {
        try {
          this.doc = this.$session.get('doc')
          const response = await AuthenticationService.pick({
            doc: this.doc
          })
          if (response.data === 'unauthorized') {
            this.$router.push('/login')
            return
          }
          this.raeresek = response.data
        } catch (error) {
          console.log(error)
        }
      }
    },
    addss () {
      this.$session.set('doc', '5c72f291e57c982b20fd43da')
      this.fetch()
      this.singleEvents[2].children[0].children[0].textContent = 'alma'
    },
    addss2 () {
      this.$session.set('doc', '5c72f1abc905772b203ffa3e')
      this.fetch()
      this.singleEvents[2].children[0].children[0].textContent = 'Yoga LeLeL 1'
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowWidth)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';
li {
  list-style-type: none;
}
a {
  text-decoration: none;
}
</style>
