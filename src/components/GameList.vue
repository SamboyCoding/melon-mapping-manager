<template>
    <div id="game-list">
        <h3>Per-Game Config</h3>
        <div v-if="games.length">
            <table>
                <thead>
                <tr>
                    <th>Game Name</th>
                    <th>Mapping URL</th>
                    <th>Obfuscation Regex</th>
                    <th>Unhollower Version Override</th>
                    <th>Dumper Version Override</th>
                    <th>Purge SHA512</th>
                </tr>
                </thead>
                <tbody>
                <game-list-entry v-for="game in games" :key="game.gameSlug" :game="game"></game-list-entry>
                </tbody>
            </table>
        </div>
        <h2 v-else>Loading Games...</h2>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'
import Game from '@/model/Game'
import GameListEntry from '@/components/GameListEntry.vue'

@Component({
    components: { GameListEntry },
})
export default class GameList extends Vue {
    public async mounted (): Promise<void> {
        try {
            const res = await axios.get('https://melon.samboy.dev/api/v1/game/');
            const games = res.data as Game[];
            this.$store.commit('storeModule/setGames', games);
        } catch (e) {
            console.log(e);
        }
    }

    get games (): Game[] {
        return this.$store.state.storeModule.games;
    }
}
</script>

<style scoped lang="scss">
#game-list {
    padding: 1rem;
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 5;
    flex-basis: 100px;
}
</style>
