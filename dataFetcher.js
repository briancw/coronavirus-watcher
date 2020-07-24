const axios = require('axios')
const csvParse = require('csv-parse/lib/sync')
const fs = require('fs')
const path = require('path')

const dataCachePath = path.resolve(__dirname, 'public', 'data', 'covid-19-cache.txt')

class DataFetcher {
    async init() {
        // Check to see if cached data exists
        if (fs.existsSync(dataCachePath)) {
            // Get update time of cached data
            let cachedData = JSON.parse(fs.readFileSync(dataCachePath, 'utf-8'))
            let cachedUpdateTime = cachedData.lastUpdateTime
            // Check most recent update time from github
            let liveLastUpdateTime = await this.getLastUpdateTime()
            if (liveLastUpdateTime !== cachedUpdateTime) {
                let covidData = await this.fetchData()
                fs.writeFileSync(dataCachePath, JSON.stringify({lastUpdateTime: liveLastUpdateTime, covidData}))
            }
            else {
                console.log('data up to date')
            }
        }
        // If no cached data exists, get the last update time and data
        else {
            let lastUpdateTime = await this.getLastUpdateTime()
            let covidData = await this.fetchData()
            fs.writeFileSync(dataCachePath, JSON.stringify({lastUpdateTime, covidData}))
        }
    }

    async getLastUpdateTime() {
        let opts = {headers: {'User-Agent': 'covid-data-bot'}}
        let response = await axios.get('https://api.github.com/repos/nytimes/covid-19-data', opts)
        return response.data.updated_at
    }

    async fetchData() {
        let response = await axios.get('https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv')
        let parsed = csvParse(response.data, {columns: true})
        return parsed
    }

    returnCovidData() {
        let {covidData} = JSON.parse(fs.readFileSync(dataCachePath, 'utf-8'))
        return covidData
    }
}

module.exports = new DataFetcher()
