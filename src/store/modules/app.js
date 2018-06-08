/**
 * Created by 陈继斌 on 2018/6/8.
 */
const app = {
    state: {
        currentPage: '',
        focusType: false
    },
    getters: {
        currentPage: state => state.currentPage,
        focusType: state => state.focusType
    },
    mutations: {
        setFocusType(state, type) {
            state.focusType = type
        },
        setCurrentPage(state, page) {
            state.currentPage = page
        }
    }
}

export default app
