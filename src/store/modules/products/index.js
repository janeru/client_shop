import actions from '@/store/modules/products/actions'
import mutations from '@/store/modules/products/mutations'
import getters from '@/store/modules/products/getters'

export default {
    namespaced: true,
    state() {
        return {

            productsInfo: {
                currentPage: 1,
                totalCount: 50,
                totalPages: 20,
                products: {
                    _id: '1234',
                    name: 'cherry',
                    price: 200,
                    count: 10,
                    image: "https://images.unsplash.com/photo-1608035910534-d29aea04943e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1617&q=80"
                }
            }
        }
    },
    actions,
    mutations,
    getters
}