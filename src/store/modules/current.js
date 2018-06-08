/**
 * Created by 陈继斌 on 2018/6/7.
 */
const current = {
    state: {
        peopleList: [],
        sessionId: null,
        chartData: []
    },
    getters: {
        peopleList: state => state.peopleList,
        currentSessionId: state => state.sessionId,
        chartData: state => state.chartData
    },
    mutations: {
        addPeople(state, newList) {
            state = [...state, ...newList]
        },
        setCurrentSessionId(state, id) {
            state.sessionId = id
        },
        addCurrentChartData(state, data) {
            state.chartData = [...state.chartData, data]
        }
    }
}

export default current
