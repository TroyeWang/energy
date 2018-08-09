<template>
    <div class="home">
        <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <p>{{token}}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios'
export default {
    name: "home",
    computed: {
        ...mapGetters({
            token: 'token',
        })
    },
    data() {
        return {
            currentRate: 1,
            text: 'hahh'
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        onClickLeft() {
            Toast('返回');
        },
        onClickRight() {
            Toast('按钮');
        },
        init() {
            this.$http('/mgr/imgCode').then((res) => {
                console.log(res.data)
            })
        }
    }
};
</script>
