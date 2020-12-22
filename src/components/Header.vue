<template>

    <header>

        <div class="wrap">
            後台購物管理頁面
        </div>
        <div class="list" role="custom-dropdown">

            <input type="checkbox" id="button">
            <label for="button">
                <i class="fa fa-bars" aria-hidden="true"></i>
            </label>
            <nav>
                <router-link to="/products/add"> <i class="fa fa-cart-plus" aria-hidden="true"></i>新增商品</router-link>
                <router-link to="/products"> <i class="fa fa-user" aria-hidden="true"></i>我的商品</router-link>

            </nav>
        </div>
    </header>
</template>

<style scoped>
    * {
        box-sizing: border-box;
    }

    body,
    html {
        height: 100%;
        width: 100%;
        position: relative;
        margin: 0;
        padding: 0;
    }

    header {
        height: 80px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0;
        align-items: center;
        background-color: #4fabc754;
        list-style: none;
        /* 移除項目符號 */
        margin: 0;
    }


    /*  */
    header a {
        color: inherit;
        /* 移除超連結顏色 */
        font-size: 1.2rem;
        text-decoration: none;
        /* 移除超連結底線 我們可以透過 display: block 把它改成區塊級元素 */
        padding: 5px 5px;
        display: block;

    }


    i.fa.fa-cart-plus,
    i.fa.fa-user {
        padding: 5px 10px;
    }

    .wrap,
    nav {
        flex: 1
    }

    .wrap {
        margin: 0 5%;
        font-size: 30px
    }

    .list {
        margin: 0 5%;
    }

    nav {
        display: flex;
        justify-content: flex-end;
    }


    .banner {
        position: relative;
        width: 100%;
        margin: 0px
    }

    .banner img {
        width: 100%;
        height: auto;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        overflow: hidden;
    }

    .bannerIntroText {
        position: absolute;
        right: 10px;
        top: 20px;
        border: 2px solid white;
        background-color: rgba(68, 0, 255, 0.1);
        mix-blend-mode: multiply;
        color: rgb(138, 46, 61);
        font-size: 30px;
    }






    .cartAndPreferenceRow {
        margin: 10px 5px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }




    .preference {
        background-color: transparent;
        border: none;
        outline: none;
        min-height: 20px
    }


    .fa.fa-bars,
    #button {
        display: none;
    }

    @media only screen and (max-width: 600px) {
        header {
            justify-content: space-between;
        }

        .wrap {
            font-size: 24px
        }

        .list {
            margin: 5px 8px;
            text-align: right;
        }

        .fa.fa-bars {
            display: block;
            position: absolute;
            right: 10px;
        }

        nav[role="custom-dropdown"] {
            position: relative;
            width: 100%;
        }

        input[type=checkbox] {
            display: none;
        }

        input[type=checkbox]~nav {
            display: none;
        }

        input[type=checkbox]:checked~nav {
            background-color: #d3e2e6;
            border: 2px solid #cbd8dc;
            display: block;
            position: absolute;
            right: 0;
            width: 100%;
            padding: 0;
            margin: 0 auto;
            z-index: 1;
            top: 80px;
            text-align: start;
        }

        nav>div {
            border: 2px solid #e6e6e6;
        }

        .bannerIntroText {
            position: relative;
            left: 0;
            border: none;
            background-color: white;
            font-size: 20px;
        }
    }
</style>