<template>
    <div id="home">
        <div class="selectBar">
            <div class="selectContainer">
                <select v-model="activeState" @change="changeStateSelected" class="stateSelect">
                    <option value="">---</option>
                    <option v-for="state in statesList" :key="state">{{state}}</option>
                </select>
            </div>

            <div class="stateTotal">
                Total: {{stateTotal}}
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

import {mapState} from 'vuex'
import {VueGoodTable} from 'vue-good-table'

export default {
    name: 'home',
    components: {
        VueGoodTable,
    },
    data() {
        return {
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
        // Sort out data into sub objects by state
        statesData() {
            let statesData = {}
            if (this.covidData.forEach) {
                this.covidData.forEach((line) => {
                    let {state} = line

                    if (!statesData[state]) {
                        statesData[state] = [line]
                    }
                    else {
                        statesData[state].push(line)
                    }
                })
            }
            return statesData
        },
        stateTotal() {
            if (this.activeState !== '' && this.statesData[this.activeState]) {
                let stateTotal = 0
                this.statesData[this.activeState].forEach((county) => {
                    stateTotal += Number(county.cases)
                })
                return (stateTotal).toLocaleString('en')
            }
            return 0
        },
        statesList() {
            return Object.keys(this.statesData)
        },
        ...mapState({
            covidDataUpdateTime: (state) => state.covidDataUpdateTime,
            covidData: (state) => state.covidData,
        }),
    },
    methods: {
        changeStateSelected() {
            window.localStorage.setItem('selected-state', this.activeState)
        },
    },
}
</script>

<style lang="less">
@import '../styles/mixins.less';

.selectBar {
    width: 100%;
    background-color: #324057;
    padding-left: 15px;

    .selectContainer {
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;

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
        font-size: 18px;
        margin-top: 10px;
        color: #fff;
        display: inline-block;
        margin-left: 15px;
    }
}

</style>
