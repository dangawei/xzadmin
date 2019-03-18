import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import feedback from './modules/feedback'
import entertest from './modules/entertest'
import enternew from './modules/enterNew'
import topic from './modules/search'
import usetest from './modules/usetest'
import news from './modules/new'

Vue.use(Vuex)

// const debug=process.env.NODE_ENV;

export default new Vuex.Store({
    modules:{
        feedback,
        entertest,
        enternew,
        common,
        topic,
        usetest,
        news
    },
    // strict:debug
})
