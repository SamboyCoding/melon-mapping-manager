<script lang="ts">
import { Pie, mixins } from 'vue-chartjs'
import { Chart } from 'chart.js'
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import randomColor from 'randomcolor'

@Component({
    extends: Pie,
    mixins: [mixins.reactiveData]
})
export default class GamesAnalyticsChart extends Vue<Pie> {
    private options: Chart.ChartOptions = {
        title: {
            display: true,
            fontSize: 20,
            text: 'Games Requested (Last 5 Minutes)'
        }
    };

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
            luminosity: 'bright'
        }))
        const data = Object.values(games)
        const labels = Object.keys(games)

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
