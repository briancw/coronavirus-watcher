<template>
    <div class="wrapper default">
        <div class="navBar">
            <div class="updateTime">{{covidDataUpdateTime}}</div>
            <div class="refreshIcon" v-on:click="refreshData"></div>
            <div class="menuButton" @click="toggleMenu"></div>

            <div class="menu" :class="{visible: showMenu}" @click="toggleMenu">
                <router-link to="/" class="menuLink">Home</router-link>
                <router-link to="/death" class="menuLink">Deaths</router-link>
                <router-link to="/watch" class="menuLink">Watch</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'default-layout',
    data() {
        return {
            showMenu: false,
        }
    },
    computed: {
        ...mapState({
            covidDataUpdateTime: (state) => state.covidDataUpdateTime,
        }),
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu
        },
        refreshData() {
            this.$store.dispatch('getCovidData')
        },
    },
}
</script>

<style lang="less">
body {
    background-color: #324057;
}

.wrapper {
    width: 100%;
    height: 100%;

    .navBar {
        height: 40px;
        background-color: #212121;
        -webkit-app-region: drag;

        .menuButton {
            position: absolute;
            top: 10px;
            right: 20px;
            width: 24px;
            height: 24px;
            background-image: url('../../public/img/menu.svg');
            cursor: pointer;
        }

        .menu {
            width: 200px;
            position: absolute;
            top: 40px;
            background-color: #aaa;
            z-index: 1;
            right: -200px;
            transition: right 0.5s ease;

            &.visible {
                right: 0px;
            }

            .menuLink {
                font-size: 24px;
                color: #222;
                text-decoration: none;
                display: block;
                padding: 10px 10px 10px 20px;
                border-bottom: 1px solid;
            }
        }

        .refreshIcon {
            position: absolute;
            top: 10px;
            right: 60px;
            width: 20px;
            height: 20px;
            background-image: url('../../public/img/refresh-cw.svg');
            background-size: 20px 20px;
            cursor: pointer;
        }

        .updateTime {
            color: #777;
            font-size: 18px;
            text-align: center;
            padding-top: 12px;
        }
    }
}
</style>
