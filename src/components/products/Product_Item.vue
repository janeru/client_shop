<template>

    <div>
        <teleport to="body">
            <info-alert v-if="showAlert" title="您確定要刪除該筆資料?" @close="hideAlert" @confirmDialog="handleConfirmAlert">
            </info-alert>
        </teleport>
        <teleport to="body">
            <api-error-alert v-if="showApiErrorAlert" title="" @close="closeApiWarnDialog">
                <h3>修改的產品資料沒有輸入齊全！</h3>
            </api-error-alert>
        </teleport>
        <teleport to="body">
            <loading v-if="isLoading"></loading>
        </teleport>
        <teleport to='body'>
            <basic-dialog :show="!!error" title="錯誤提示!" @close="handleError">
                <p>{{error}}</p>
            </basic-dialog>
        </teleport>
        <div class="productItem">
            <img :src="img" alt="">
            <div class="productNamePrice">
                <div class="productName">
                    <div class="fixedName">Name:</div>
                    <div v-if="!editInput" class="name">{{name}}</div>
                    <input v-else id="product-name" name="product-name" type="text" v-model.trim="productName" />
                </div>


                <div class="productPrice">
                    <div class="fixedPrice">Price:</div>
                    <div v-if="!editInput" class="price">{{price}}</div>
                    <input v-else id="product-price" name="product-price" type="text" v-model.number="productPrice" />
                </div>
            </div>

            <div class="cartAndPreferenceRow">
                <button v-if="!editInput" class="edit" @click="edit">
                    編輯
                </button>
                <button v-else class="edit" @click="confirmEdit">
                    確定編輯
                </button>

                <button v-if="!editInput" class="delete" @click="checkDelete">
                    刪除
                </button>
                <button v-else class="delete" @click="cancelEdit">
                    取消
                </button>
            </div>
        </div>
    </div>


</template>

<script>
    import { ref, watchEffect } from 'vue'
    // import { useRouter } from 'vue-router'
    import InfoAlert from '../alert/InfoAlert.vue';
    import ApiErrorAlert from '../alert/ApiErrorAlert.vue';
    import { useStore } from 'vuex'
    export default {
        components: { InfoAlert, ApiErrorAlert },
        props: ['productItem'],
        emit: ['fetchProduct'],
        setup(props, context) {
            // const router = useRouter()
            const isLoading = ref(false)
            const showApiErrorAlert = ref(false)
            const productName = ref('')
            const productPrice = ref(null)
            const store = useStore()
            const editInput = ref(false)
            const price = ref(null)
            const name = ref('')
            const img = ref('')
            const showAlert = ref(false)
            const error = ref(null)
            watchEffect(function () {
                price.value = props.productItem.price
                name.value = props.productItem.name
                img.value = props.productItem.image

            })

            function edit() {
                console.log(editInput)
                editInput.value = true
            }
            function closeApiWarnDialog() {
                showApiErrorAlert.value = false
            }
            function handleError() {
                error.value = null
            }
            async function confirmEdit() {
                isLoading.value = true
                editInput.value = false

                if ((productName.value === '' || productName.value === null) || (productPrice.value === '' || productPrice.value === null) ||
                    (props.productItem._id === undefined || props.productItem._id === null)) {
                    showApiErrorAlert.value = true
                    isLoading.value = false
                    productName.value = ''
                    productPrice.value = ''
                } else {

                    name.value = productName.value
                    price.value = productPrice.value
                    const data = {
                        _id: props.productItem._id,
                        name: productName.value,
                        price: productPrice.value
                    }
                    try {
                        await store.dispatch('product/updateProductItem', data)
                        isLoading.value = false
                        productName.value = ''
                        productPrice.value = ''
                        context.emit('fetchProduct')
                    } catch (err) {
                        error.value = err
                        isLoading.value = false
                    }
                }
            }

            function checkDelete() {
                showAlert.value = true
            }
            function cancelEdit() {
                editInput.value = false
            }
            function hideAlert() {
                showAlert.value = false;
            }
            async function handleConfirmAlert() {
                showAlert.value = false;
                const data = { _id: props.productItem._id }
                isLoading.value = true
                try {
                    await store.dispatch('product/deleteProductItem', data)
                    isLoading.value = false
                    context.emit('fetchProduct')
                } catch (err) {
                    error.value = err
                    isLoading.value = false
                }
            }

            return {
                handleError, error,
                price, name, img, edit, editInput, cancelEdit, productName, productPrice,
                showAlert, hideAlert, handleConfirmAlert, checkDelete, confirmEdit,
                showApiErrorAlert, closeApiWarnDialog, isLoading
            }
        }
    }
</script>
<style scoped>
    .productItem {
        border-radius: 7px;
        border: 2px solid rgba(85, 81, 81, 0.15);
        box-shadow: 2px 2px 4px rgba(85, 81, 81, 0.15);
        margin: 10px 10px;
        min-height: 350px;
        text-align: center;
        /* Align text on center */
        /* display: flex; */
        /*  Display as flex */
        /* flex-direction: column; */
        /* Display flex in column */

    }

    .productItem:hover {
        box-shadow: 2px 2px 4px rgba(85, 81, 81, 0.15);
        transform: translateY(-10px) translateX(-5px);
    }

    .productItem img {
        width: 160px;
        height: 160px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        overflow: hidden;
    }

    .cartAndPreferenceRow {
        margin: 10px 5px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-self: flex-end;
    }

    .productNamePrice {
        min-height: 110px;
        margin: 10px 5px;
    }

    .productName,
    .productPrice {
        display: flex;
        justify-content: center;

    }

    .fixedName,
    .fixedPrice {
        margin: 5px 0px;
        flex: 1;
        text-align: left
    }



    .name,
    .price,
    #product-name,
    #product-price {
        margin: 5px 0px;
        flex: 3;
        text-align: left
    }

    .edit {
        margin: 0px 5px;
        flex: 1;
        outline: none;
        /* min-width:80px; */
        font-size: 15px;
        color: white;
        background-color: #ffb6c1;
        border: 2px solid #ffb6c1;
        border-radius: 6px;
        transition-duration: 0.5s;
        box-shadow: 0 5px grey;
    }

    .edit:active {
        box-shadow: 0 5px grey;
        transform: translateY(-5px);
    }


    .delete {
        margin: 0px 5px;
        flex: 1;
        outline: none;
        /* min-width:80px; */
        font-size: 15px;
        color: white;
        background-color: lightblue;
        border: 2px solid lightblue;
        border-radius: 6px;
        transition-duration: 0.5s;
        box-shadow: 0 5px grey;
    }

    .delete:active {

        box-shadow: 0 5px grey;
        transform: translateY(-5px);
    }
</style>