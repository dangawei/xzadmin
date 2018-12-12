import * as types from '../type'

const state={
    schoolId:'',//学校id
    classId:'',//学校id
}


const mutations={
    [types.common_schoolId](state,data){
        state.schoolId=data
    },
    [types.common_classId](state,data){
        state.classId=data
    }
}

const actions={
    commonSchoolId({commit},data){
        commit(types.common_schoolId,data);
    },
    commonClassId({commit},data){
        commit(types.common_classId,data);
    },
}

export default ({
    state,
    mutations,
    actions
})
