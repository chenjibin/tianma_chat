/**
 * Created by 陈继斌 on 2018/6/8.
 */
const app = {
    state: {
        currentPage: '',
        focusType: false,
        isHidden: false
    },
    getters: {
        currentPage: state => state.currentPage,
        focusType: state => state.focusType,
        isHidden: state => state.isHidden
    },
    mutations: {
        setFocusType(state, type) {
            state.focusType = type
        },
        setCurrentPage(state, page) {
            state.currentPage = page
        },
        setIsHidden(state, isHidden) {
            state.isHidden = isHidden
        }
    }
}

export default app
