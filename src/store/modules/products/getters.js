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
        console.log(state.productsInfo.totalCount)
        return state.productsInfo.totalCount > 0
    },
    hasNowProdcuts(state) {
        console.log(state.productsInfo.products.length)
        return state.productsInfo.products.length > 0
    }
}