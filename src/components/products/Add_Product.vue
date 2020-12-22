<template>
    <section>
        <teleport to="body">
            <api-error-alert v-if="showApiErrorAlert" title="" @close="closeApiWarnDialog">
                <h3>新增的產品資料沒有輸入齊全！</h3>
            </api-error-alert>
        </teleport>
        <teleport to="body">
            <loading v-if="isLoading"></loading>
        </teleport>
        <!-- 強制將String 的error轉換成Boolean的error -->
        <teleport to='body'>
            <basic-dialog :show="!!error" title="錯誤提示!" @close="handleError">
                <p>{{error}}</p>
            </basic-dialog>
        </teleport>
        <h2>新增商品</h2>
        <form @submit.prevent="submitForm">
            <div class="formInlineDiv">
                <label for="productName">名稱</label>
                <input type="text" id="name" v-model.trim="enteredName" />
            </div>
            <div class="formInlineDiv">
                <label for="productPrice">價格</label>
                <input type="number" id="price" v-model.number="enteredPrice" />
            </div>
            <div class="formInlineDiv">
                <label for="productCount">數量</label>
                <input type="number" id="count" v-model.number="enteredCount" />
            </div>
            <div class="formInlineDiv">
                <label for="productImgUrl">網址</label>
                <input type="text" id="imageUrl" v-model.trim="enteredImgUrl" />
            </div>
            <button>新增商品</button>
        </form>
    </section>
</template>

<script>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'
    import ApiErrorAlert from '../alert/ApiErrorAlert.vue';
    import { useStore } from 'vuex'
    export default {
        components: { ApiErrorAlert },
        setup() {

            const router = useRouter()
            const isLoading = ref(false)
            const enteredName = ref('');
            const enteredPrice = ref(null);
            const enteredImgUrl = ref('');
            const enteredCount = ref(null);
            const showApiErrorAlert = ref(false)
            const error = ref(null)
            const store = useStore()
            async function submitForm() {

                // 接新增產品的api
                if ((enteredName.value === '' || enteredName.value === null)
                    || (enteredPrice.value === '' || enteredPrice.value === null)
                    || (enteredCount.value === '' || enteredCount.value === null)
                    || (enteredImgUrl.value === '' || enteredImgUrl.value === null)) {
                    showApiErrorAlert.value = true
                } else {
                    isLoading.value = true
                    const data = {
                        name: enteredName.value,
                        price: enteredPrice.value,
                        count: enteredCount.value,
                        image: enteredImgUrl.value,
                    }
                    try {
                        await store.dispatch('product/insertProductItem', data)
                        isLoading.value = false

                    } catch (err) {
                        console.log(err)
                        error.value = err.message || 'error...'
                        isLoading.value = false
                    }
                    router.push('/products')
                }

            }
            function handleError() {
                error.value = null
            }
            function closeApiWarnDialog() {
                showApiErrorAlert.value = false
            }
            return {
                enteredName,
                enteredPrice,
                enteredImgUrl,
                enteredCount,
                submitForm,
                showApiErrorAlert,
                closeApiWarnDialog,
                isLoading,
                error,
                handleError
            };
        },
    };
</script>

<style scoped>
    section {
        padding: 20px 100px;
    }

    form {
        text-align: center;
        padding: 20px 100px;
    }

    .formInlineDiv {
        display: flex
    }

    label {
        padding: 10px;
        font-weight: bold;
    }

    input {
        flex: 3;
        font: inherit;
        margin-bottom: 0.5rem;
    }

    button {
        font: inherit;
        background-color: #ff0073fa;
        border: 1px solid #57008063;
        color: white;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        margin: 10px 0px
    }

    button:hover,
    button:active {
        background-color: #220031;
        border-color: #220031;
    }

    @media only screen and (max-width: 800px) {
        section {
            padding: 5px 10px;
        }

        form {
            padding: 0
        }
    }
</style>