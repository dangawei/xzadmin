import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import feedback from './modules/feedback'
import entertest from './modules/entertest'
import topic from './modules/search'
import usetest from './modules/usetest'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        feedback,
        entertest,
        common,
        topic,
        usetest
    }
})
