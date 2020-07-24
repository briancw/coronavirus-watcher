<template>
    <div id="watch">
        <div class="topContainer">
            <router-link to="/" class="homeIcon"></router-link>
            <div class="pageName">Watched</div>
        </div>

        <input type="text" v-model="countySearchString" />
    </div>
</template>

<script>
export default {
    name: 'settings',
    data() {
        return {
            countySearchString: '',
        }
    },
    methods: {
    },
}
</script>

<style lang="less">
@import '../styles/mixins.less';

.topContainer {
    width: 100%;
    height: 130px;
    background-color: #212121;
    text-align: center;
    -webkit-app-region: drag;
    cursor: pointer;

    .homeIcon {
        position: absolute;
        top: 35px;
        left: 15px;
        width: 36px;
        height: 36px;
        background-image: url('../../public/img/home.svg');
        background-size: 36px 36px;
        cursor: pointer;
    }

    .pageName {
        position: absolute;
        text-align: center;
        color: #fff;
        top: 35px;
        left: 50%;
        width: 200px;
        margin-left: -100px;
        font-size: 32px;
    }
}

</style>
