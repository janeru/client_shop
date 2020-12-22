<template>
    <!-- <div class="backdrop" @click="closeDialog"></div> -->
    <div class="backdrop"></div>
    <dialog open>
        <header>
            <h3>{{ title }}</h3>
        </header>
        <div>
            <slot></slot>
        </div>

        <div class="alertButton">
            <button class="confirm" @click="closeApiErrorDialog">關閉</button>
        </div>

    </dialog>
</template>

<script>
    export default {
        props: ['title'],
        emits: ['close'],
        setup(_, context) {
            function closeApiErrorDialog() {
                context.emit('close');
            }


            return { closeApiErrorDialog };
        },
    };
</script>

<style scoped>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.75);
        z-index: 1000;
    }

    dialog {
        margin: 0;
        padding: 0;
        border: none;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        position: fixed;
        top: 30vh;
        /* left: calc(50% - 15rem); */
        width: 30rem;
        background-color: white;
        z-index: 10000;
        overflow: hidden;
        /* position: absolute; */
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

    }

    header {
        width: 100%;
        padding: 10px;
        background-color: #4fabc7;
        color: white;
    }

    dialog div {
        padding: 1rem;
    }

    .alertButton {
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .alertButton .confirm {
        padding: 5px 10px;
        margin: 0px 5px;
        background-color: #ff0000a8;
        border: 2px solid #ff0000a8;
        color: white;
        border-radius: 6px;
    }

    .alertButton .cancel {

        padding: 5px 10px;
        margin: 0px 5px;
        background-color: #eee;
        border: 2px solid #eee;
        border-radius: 6px;
    }

    @media only screen and (max-width: 600px) {
        dialog {
            width: 300px
        }
    }
</style>