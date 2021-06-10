<template>
    <div id="side-nav">
        <img src="../assets/melon.webp" alt="MelonLoader Logo" id="ml-logo">
        <h3 id="ml-title">MelonLoader Game Dashboard</h3>
        <div id="menu-items">
            <div :class="{'menu-item': true, active: currentPage === k}" :key="k" v-for="(v, k) in pages" @click="currentPage = k">
                {{ v }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class SideNav extends Vue {
    public pages = {
        'game-list': 'Games',
        'analytics-screen': 'Analytics'
    }

    get currentPage (): string {
        return this.$store.state.storeModule.currentPage;
    }

    set currentPage (value: string) {
        this.$store.commit('storeModule/setCurrentPage', value);
    }
}
</script>

<style scoped lang="scss">
$bgColor: #2c3e50;

#side-nav {
    flex-grow: 1;
    background: $bgColor;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    color: white;
    flex-basis: 100px;

    #ml-logo {
        align-self: center;
        margin-top: 1rem;
    }

    #ml-title {
        align-self: center;
        display: block;
        margin: 1rem 0;
        text-align: center;
    }

    #menu-items {
        display: flex;
        flex-flow: column nowrap;
        border-top: 1px solid lighten($bgColor, 30%);

        .menu-item {
            width: 100%;
            padding: 1rem 0.5rem;
            cursor: pointer;

            &:hover {
                background: lighten($bgColor, 10%);
            }

            &.active {
                background: lighten($bgColor, 15%);
            }
        }
    }
}
</style>
