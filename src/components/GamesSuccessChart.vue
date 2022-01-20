<template>
    <PieChart v-if="chartData" :chart-data="chartData" :options="options"></PieChart>
</template>

<script lang="ts">
import { PieChart } from 'vue-chart-3';
import { ChartData, ChartOptions, PieDataPoint } from 'chart.js'
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component({
    components: {
        PieChart
    }
})
export default class GamesSuccessChart extends Vue {
    // noinspection JSUnusedLocalSymbols
    private options: ChartOptions = {
        plugins: {
            title: {
                display: true,
                font: {
                    size: 20,
                },
                text: 'Game Database Hit/Miss (Last 5 Minutes)',
            },
        },
    };

    private chartData?: ChartData<'pie', PieDataPoint[], string> | null = null;

    constructor () {
        super()
        this.fetchData()

        setInterval(this.fetchData, 10_000)
    }

    public async fetchData (): Promise<void> {
        const res = await axios.get('https://melon.samboy.dev/api/v1/analytics/last-5-minutes/success/')
        const games = res.data as { [key: string]: number }

        const colors = Object.keys(games).map(k => k === 'success' ? '#27ae60' : '#e74c3c')
        const data = Object.values(games)
        const labels = Object.keys(games).map(k => k === 'success' ? 'Database Hit' : 'Database Miss')

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
