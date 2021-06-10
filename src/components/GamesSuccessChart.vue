<script lang="ts">
import { Pie, mixins } from 'vue-chartjs'
import { Chart } from 'chart.js'
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component({
    extends: Pie,
    mixins: [mixins.reactiveData]
})
export default class GamesSuccessChart extends Vue<Pie> {
    private options: Chart.ChartOptions = {
        title: {
            display: true,
            fontSize: 20,
            text: 'Game Database Hit/Miss (Last 5 Minutes)'
        }
    };

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

        // @ts-ignore
        this.chartData = {
            labels,
            datasets: [{
                backgroundColor: colors,
                data,
            }]
        }
    }

    public mounted (): void {
        // @ts-ignore
        this.renderChart(this.chartData, this.options);
    }
}
</script>

<style scoped lang="scss">

</style>
