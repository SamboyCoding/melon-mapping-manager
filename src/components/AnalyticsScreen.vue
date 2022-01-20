<template>
    <div id="analytics-screen">
        <h3>Analytics</h3>
        <div class="analytics-row">
            <games-analytics-chart :style="chartStyles"></games-analytics-chart>
            <games-success-chart :style="chartStyles"></games-success-chart>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import GamesAnalyticsChart from '@/components/GamesAnalyticsChart.vue'
import GamesSuccessChart from '@/components/GamesSuccessChart.vue'

@Component({
    components: { GamesSuccessChart, GamesAnalyticsChart }
})
export default class AnalyticsScreen extends Vue {
    get chartStyles (): unknown {
        return {
            width: '40%',
            height: '500px',
            position: 'relative'
        }
    }
}
</script>

<style scoped lang="scss">
#analytics-screen {
    padding: 1rem;
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 5;
    flex-basis: 100px;

    .analytics-row {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        position: relative;
        justify-content: space-around;
    }
}
</style>
