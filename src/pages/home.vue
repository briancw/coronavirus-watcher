<template>
    <div id="home">
        <div class="topContainer">
            <div class="selectContainer">
                <select v-model="activeState" @change="changeStateSelected" class="stateSelect">
                    <option value="">---</option>
                    <option v-for="state in statesList" :key="state">{{state}}</option>
                </select>
            </div>

            <router-link class="settingsIcon" to="/settings"></router-link>
            <div class="refreshIcon" v-on:click="refreshData"></div>

            <div class="stateTotal">
                State Total: {{stateTotal}}
            </div>
        </div>

        <div class="tableContainer">
            <vue-good-table
                v-if="activeState && statesData[activeState]"
                :columns="tableColumns"
                :rows="statesData[activeState]"
                :sort-options="{
                    enabled: true,
                    initialSortBy: {field: 'cases', type: 'desc'}
                }"
                theme="nocturnal"
            ></vue-good-table>
        </div>
    </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'

import {ipcRenderer} from 'electron'
import {VueGoodTable} from 'vue-good-table'

export default {
    name: 'home',
    components: {
        VueGoodTable,
    },
    data() {
        return {
            statesList: [],
            statesData: {},
            activeState: window.localStorage.getItem('selected-state'),
            tableColumns: [
                {label: 'County', field: 'county'},
                {label: 'Cases', field: 'cases', type: 'number'},
                {label: 'Deaths', field: 'deaths', type: 'number'},
            ],
            tableColumnsExpanded: [
                {label: 'County', field: 'county'},
                {label: 'Confirmed Cases', field: 'confirmed_cases', type: 'number'},
                {label: 'Probable Cases', field: 'probable_cases', type: 'number'},
                {label: 'Cases', field: 'cases', type: 'number'},
                {label: 'Deaths', field: 'deaths', type: 'number'},
                {label: 'Probable Deaths', field: 'probable_deaths', type: 'number'},
            ],
        }
    },
    computed: {
        stateTotal() {
            if (this.activeState !== '' && this.statesData[this.activeState]) {
                let stateTotal = 0
                this.statesData[this.activeState].forEach((county) => {
                    stateTotal += Number(county.cases)
                })
                return stateTotal
            }
            return 0
        },
    },
    methods: {
        refreshData() {
            ipcRenderer.send('data-request')
        },
        openSettings() {
            console.log('settings')
        },
        changeStateSelected() {
            window.localStorage.setItem('selected-state', this.activeState)
        },
    },
    mounted() {
        ipcRenderer.send('data-request')

        ipcRenderer.on('data-response', (event, covidData) => {
            // Build states list
            this.statesData = {}
            covidData.forEach((line) => {
                let {state} = line

                if (!this.statesData[state]) {
                    this.statesData[state] = [line]
                }
                else {
                    this.statesData[state].push(line)
                }
            })
            this.statesList = Object.keys(this.statesData)
        })
    },
}
</script>

<style lang="less">
@import '../styles/mixins.less';

.topContainer {
    width: 100%;
    height: 100px;
    background-color: #212121;
    text-align: center;
    -webkit-app-region: drag;
    cursor: pointer;

    .selectContainer {
        display: inline-block;
        margin-top: 15px;

        .stateSelect {
            display: block;
            background-color: #00f;
            height: 40px;
            border-radius: 15px;
            background-color: #000;
            color: #fff;
            font-size: 20px;
            text-align-last: center;
            border: none;
        }
    }

    .stateTotal {
        font-size: 20px;
        margin-top: 10px;
        color: #fff;
    }

    .settingsIcon {
        position: absolute;
        top: 35px;
        left: 15px;
        width: 36px;
        height: 36px;
        background-image: url('../../public/img/settings.svg');
        background-size: 36px 36px;
        cursor: pointer;
    }

    .refreshIcon {
        position: absolute;
        top: 35px;
        right: 15px;
        width: 36px;
        height: 36px;
        background-image: url('../../public/img/refresh-cw.svg');
        cursor: pointer;
    }
}
.tableContainer {
}
</style>
