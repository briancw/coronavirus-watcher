<template>
    <div id="watch">
        <!-- <div class="pageName">Watched</div> -->

        <div class="searchContainer">
            County Name:
            <input type="text" v-model="countySearchString" />
        </div>

        <div class="watched">
            <vue-good-table
                v-if="watchedCounties.length"
                :columns="tableColumns"
                :rows="watchedCounties"
                :sort-options="{
                    enabled: true,
                    initialSortBy: {field: 'cases', type: 'desc'}
                }"
                theme="nocturnal"
            ></vue-good-table>
        </div>

        <div class="countyList">
            <div v-for="county in filteredCounties" class="county">
                {{county.county}}, {{county.state}}
                <div class="watchButton" @click="watchCounty(county)"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {VueGoodTable} from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

export default {
    name: 'settings',
    components: {
        VueGoodTable,
    },
    data() {
        return {
            countySearchString: '',
            tableColumns: [
                {label: 'County', field: 'county'},
                {label: 'Cases', field: 'cases', type: 'number'},
                {label: 'Deaths', field: 'deaths', type: 'number'},
            ],
        }
    },
    computed: {
        filteredCounties() {
            let list = []
            if (this.covidData.forEach && this.countySearchString.length > 2) {
                this.covidData.forEach((county) => {
                    if (this.countySearchString.toLowerCase() === county.county.slice(0, this.countySearchString.length).toLowerCase()) {
                        list.push(county)
                    }
                })
            }
            return list
        },
        watchedCounties() {
            let list = []
            if (this.covidData.forEach) {
                this.covidData.forEach((county) => {
                    if (this.watchedCountiesIds.includes(county.fips)) {
                        list.push(county)
                    }
                })
            }
            return list
        },
        ...mapState({
            covidData: (state) => state.covidData,
            watchedCountiesIds: (state) => state.watchedCountiesIds,
        }),
    },
    methods: {
        watchCounty(county) {
            if (this.watchedCountiesIds.includes(county.fips)) {
                this.watchedCountiesIds.splice(this.watchedCountiesIds.indexOf(county.fips), 1)
            }
            else {
                this.watchedCountiesIds.push(county.fips)
            }

            localStorage.setItem('watched-counties', JSON.stringify(this.watchedCountiesIds))
        },
    },
}
</script>

<style lang="less">
@import '../styles/mixins.less';

#watch {
    color: #fff;
    padding-left: 15px;
    padding-top: 15px;
    padding-right: 15px;

    .watched {
        margin-top: 20px;
    }

    .searchContainer {
        font-size: 18px;
    }

    .countyList {
        padding-top: 15px;

        .county {
            font-size: 18px;
            margin-bottom: 8px;
        }

        .watchButton {
            display: inline-block;
            background-image: url('../../public/img/eye.svg');
            width: 20px;
            height: 20px;
            background-size: 20px 20px;
            vertical-align: middle;
            cursor: pointer;
        }
    }
}

</style>
