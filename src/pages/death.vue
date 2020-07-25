<template>
    <div id="death">
        <div class="explanation">2017 CDC Data for Cause of Death in the USA</div>
        <div class="deathList">
            <div v-for="cause in sortedDeaths" class="deathCause" :class="{coronavirus: cause.cause === 'Coronavirus'}" :key="cause.cause">
                {{cause.cause}}: {{cause.count.toLocaleString('en')}}
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'death',
    data() {
        return {
            deathsByCause: [
                {cause: 'Heart disease', count: 655381},
                {cause: 'Cancer', count: 599274},
                {cause: 'Alzheimer’s, dementia and brain degeneration', count: 267311},
                {cause: 'Emphysema and COPD', count: 154603},
                {cause: 'Stroke', count: 147810},
                {cause: 'Diabetes', count: 84946},
                {cause: 'Drug overdoses', count: 67367},
                {cause: 'Pneumonia/flu', count: 59690},
                {cause: 'Liver disease and cirrhosis', count: 55918},
                {cause: 'Renal failure', count: 50404},
                {cause: 'Car crashes', count: 42114},
                {cause: 'Septicemia', count: 40718},
                {cause: 'Guns', count: 39201},
                {cause: 'Falls', count: 37558},
                {cause: 'Hypertension', count: 35835},
                {cause: 'Parkinson’s and other movement disorders', count: 35598},
                {cause: 'Obesity and other metabolic disorders', count: 35178},
                {cause: 'Digestive diseases', count: 31015},
                {cause: 'Atherosclerosis and other arterial diseases', count: 24808},
            ],
        }
    },
    computed: {
        countryTotal() {
            let total = 0
            if (this.covidData.forEach) {
                this.covidData.forEach(({deaths}) => {
                    total += Number(deaths)
                })
            }
            return total
        },
        sortedDeaths() {
            let sorted = []
            this.deathsByCause.forEach((cause) => {
                sorted.push(cause)
            })
            sorted.push({cause: 'Coronavirus', count: this.countryTotal})

            if (sorted.length) {
                sorted.sort(this.compare)
            }

            return sorted
        },
        ...mapState({
            covidData: (state) => state.covidData,
        }),
    },
    methods: {
        compare(a, b) {
            let comparison = 0
            if (a.count > b.count) {
                comparison = -1
            }
            else if (b.count > a.count) {
                comparison = 1
            }
            return comparison
        },
    },
}
</script>

<style lang="less">
#death {
    height: 100%;
    background-color: #324057;
    color: #fff;

    .explanation {
        font-size: 18px;
        text-align: center;
        padding: 20px 0px 20px 0px;
    }

    .deathList {
        padding-right: 10px;

        .deathCause {
            text-align: right;
            padding-top: 10px;
            padding-bottom: 10px;

            &.coronavirus {
                color: #ff6969;
            }

            &.covid {
                color: #ff0000;
            }
        }
    }
}
</style>
