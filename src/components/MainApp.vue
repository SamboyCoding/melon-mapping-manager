<template>
    <div id="main-app">
        <side-nav></side-nav>
        <component :is="currentPage"></component>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import GameList from '@/components/GameList.vue'
import SideNav from '@/components/SideNav.vue'
import AnalyticsScreen from '@/components/AnalyticsScreen.vue'

@Component({
    components: { SideNav, GameList, AnalyticsScreen }
})
export default class MainApp extends Vue {
    get currentPage (): string {
        return this.$store.state.storeModule.currentPage;
    }
}
</script>

<style scoped lang="scss">
#main-app {
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
}
</style>
