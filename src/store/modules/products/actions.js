import { getProduct } from '../../../api/product'
import { deleteProduct } from '../../../api/product'
import { updateProduct } from '../../../api/product'
import { insertProduct } from '../../../api/product'
export default {
    async loadProductInfo(context, payload) {
        const resData = await getProduct(payload.queryParams)
        if (resData.error) {
            const error = new Error(resData.message || resData.error || 'Failed to fetch data')
            throw error
        }

        const productsArr = []
        const products = resData.results.products
        for (const key in products) {
            const product = {
                _id: products[key]._id,
                name: products[key].name,
                price: products[key].price,
                count: products[key].count,
                image: products[key].image
            }

            productsArr.push(product)
        }
        const productInfo = {
            currentPage: resData.results.currentPage,
            totalCount: resData.results.totalCount,
            totalPages: resData.results.totalPages,
            products: productsArr
        }

        context.commit('setProduct', productInfo)

    },
    async updateProductItem(_, payload) {
        const resData = await updateProduct(payload)
        if (resData.error) {
            const error = new Error(resData.message || resData.error || 'Failed to update data')
            throw error
        }
    },
    async deleteProductItem(_, payload) {
        const resData = await deleteProduct(payload)

        if (resData.error) {
            const error = new Error(resData.message || resData.error || 'Failed to delete data')
            throw error
        }
    },
    async insertProductItem(_, payload) {
        const resData = await insertProduct(payload)
        if (resData.error) {
            const error = new Error(resData.message || resData.error || 'Failed to delete data')
            throw error
        }
    }

}