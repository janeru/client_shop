export default {
    products(state) {

        return state.productsInfo.products
    },
    currentPage(state) {
        return state.productsInfo.currentPage
    },
    totalCount(state) {
        return state.productsInfo.totalCount
    },
    hasProdcuts(state) {
        return state.productsInfo.products && state.productsInfo.products.length > 0
    }
}