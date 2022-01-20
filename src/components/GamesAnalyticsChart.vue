<template>
    <PieChart v-if="chartData" :chart-data="chartData" :options="options"></PieChart>
</template>

<script lang="ts">
import { PieChart } from 'vue-chart-3';
import { ChartData, ChartOptions, PieDataPoint } from 'chart.js'
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import randomColor from 'randomcolor'

@Component({
    components: {
        PieChart,
    },
})
export default class GamesAnalyticsChart extends Vue {
    // noinspection JSUnusedLocalSymbols
    private options: ChartOptions = {
        plugins: {
            title: {
                display: true,
                font: {
                    size: 20,
                },
                text: 'Games Requested (Last 5 Minutes)',
            }
        },
    };

    private chartData?: ChartData<'pie', PieDataPoint[], string> | null = null;

    constructor () {
        super()
        this.fetchData()

        setInterval(this.fetchData, 10_000)
    }

    public async fetchData (): Promise<void> {
        const res = await axios.get('https://melon.samboy.dev/api/v1/analytics/last-5-minutes/games/')
        const games = res.data as { [key: string]: number }

        const colors = Object.keys(games).map(k => randomColor({
            seed: k,
            luminosity: 'bright',
        }))
        const data = Object.values(games)
        const labels = Object.keys(games)

        this.chartData = {
            labels,
            datasets: [{
                backgroundColor: colors,
                data,
            }],
        }
    }
}
</script>

<style scoped lang="scss">

</style>
