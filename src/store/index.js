import { createStore } from "vuex"

import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"

const store = createStore({
    state(){
        return{
            tasks:[
                // {
                //     id: 1,
                //     taskName: 'Complete Todo App',
                //     taskStatus: 'open',
                //     subtasks:[
                //         {subtaskId: 1, subtaskName:'Build UI', subtaskStatus: 'open'},
                //         {subtaskId: 2, subtaskName:'Build Functionality', subtaskStatus: 'open'},
                //     ],
                //     isFavorite: true,
                //     isMyDay: true,
                //     notes: 'Try to finish the whole project by next week'
                // },
                // {
                //     id: 2,
                //     taskName: 'Start Dev for Todo App',
                //     taskStatus: 'done',
                //     subtasks:[],
                //     isFavorite: false,
                //     isMyDay: false,
                //     notes: ''
                // }
            ]
        }
    },
    getters,
    actions,
    mutations
})

export default store;