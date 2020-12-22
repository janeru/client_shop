<template>
    <teleport to="body">
        <loading v-if="isLoading"></loading>
    </teleport>
    <teleport to='body'>
        <basic-dialog :show="!!error" title="錯誤提示!" @close="handleError">
            <p>{{error}}</p>
        </basic-dialog>
    </teleport>
    <div class="mainProducts" v-if="hasProducts">

        <div class="priceSorting">
            <button class="sorting" @click="sort('asc')" :class="{selected: sorting === 'asc'}">價格<i
                    class="fa fa-sort-amount-asc" aria-hidden="true"></i></button>
            <button class="sorting" @click="sort('desc')" :class="{selected: sorting === 'desc'}">價格<i
                    class="fa fa-sort-amount-desc" aria-hidden="true"></i></button>
        </div>
        <section class="product">

            <ProductItem v-for="productItem in productData" :productItem="productItem" :key="productItem.id"
                @fetchProduct="getProductData">

            </ProductItem>

        </section>
        <pagination v-model="nowPage" :records="totalCount" :per-page="limit" @paginate="setPage" hasRecords="false" />
    </div>
    <no-data-view v-else></no-data-view>
</template>

<script>
    import { ref, onMounted, computed } from 'vue'
    import ProductItem from './Product_Item'
    import useSort from '../../hooks/sort'

    import NoDataView from '@/components/NoData.vue/NoDataView'
    import Pagination from 'v-pagination-3';
    import { useStore } from 'vuex'
    export default {

        components: {
            ProductItem,
            NoDataView,
            Pagination
        },
        setup() {
            const isLoading = ref(false)
            const nowPage = ref(1)
            const limit = ref(20)
            const error = ref(null)
            const store = useStore()
            onMounted(() => {
                getProductData()
            })
            async function getProductData() {
                isLoading.value = true
                try {
                    await store.dispatch('product/loadProductInfo', {
                        queryParams: { page: nowPage.value, limit: limit.value }
                    })
                    // 等到上面資料拿到，loading就可以停止
                    isLoading.value = false
                } catch (err) {
                    error.value = err
                    isLoading.value = false
                }
            }
            function handleError() {
                error.value = null
            }
            function setPage(page) {
                console.log(page)
                getProductData()
                // nowPage.value = page
            }
            const productData = computed(function () {
                return store.getters['product/products']

            })

            const totalCount = computed(function () {
                return store.getters['product/totalCount']
            })


            const hasProducts = computed(function () {
                return store.getters['product/hasProdcuts']
            })

            const { displayedItems, sorting, sort } = useSort(productData, 'price')


            return { hasProducts, handleError, error, setPage, productData: displayedItems, sorting, sort, getProductData, isLoading, nowPage, limit, totalCount }
        }
    }
</script>
<style scoped>
    .mainProducts {
        padding-bottom: 60px;
    }

    .product {
        display: grid;
        /* Make products flex in row direction (default) */
        margin: 50px 100px;
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        justify-content: center;
        align-content: center;

    }

    .priceSorting {
        padding: 0px 5px;
        display: flex;
        justify-content: flex-end;
    }

    .sorting {
        margin: 5px 5px;
        border-radius: 6px;
        background: #8a2e3d66;
        border: 1px;
        outline: none;
        padding: 3px 6px;
        color: white
    }
</style>

<style>
    .VuePagination {
        position: relative;
    }

    nav>ul.VuePagination__pagination.pagination.VuePagination__pagination {
        display: flex !important;
        list-style: none !important;
        justify-content: center;
        position: absolute;
        bottom: 5px;

        left: 0;
        right: 0;
        padding-left: 0px;
    }

    .VuePagination__pagination.pagination.VuePagination__pagination>:first-child {
        display: none;
    }

    button.page-link {
        border-radius: 6px;
        border: 1px solid #4fabc754;
        padding: 5px;
        margin: 3px;
    }

    button.page-link.active {
        outline: none;
        background: #4fabc754;
        border-radius: 6px;
        border: 1px solid #4fabc754;
    }


    .VuePagination__pagination.pagination.VuePagination__pagination>:last-child {
        display: none;
    }

    .VuePagination nav p {
        display: none !important;
    }
</style>