<template>
    <div id="app">
        <login-screen v-if="!role"></login-screen>
        <main-app v-else></main-app>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginScreen from '@/components/LoginScreen.vue'

const MainApp = () => import('@/components/MainApp.vue');

@Component({
    components: {
        MainApp,
        LoginScreen
    }
})
export default class App extends Vue {
    get role (): string {
        return this.$store.state.storeModule.role;
    }
}
</script>

<style lang="scss">
html, body {
    height: 100%;
    margin: 0;
}

* {
    box-sizing: border-box;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
}
</style>
