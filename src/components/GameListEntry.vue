<template>
    <tr class="game-list-entry">
        <td>{{ game.gameName }}</td>
        <td style="width: 50%">
            <editable-text-field :should-link="!!game.mappingUrl" v-model="gameCopy.mappingUrl" v-on:save="patchMappingUrl"></editable-text-field>
        </td>
        <td>
            <editable-text-field style="font-family: monospace" :should-link="false" v-model="gameCopy.obfuscationRegex" v-on:save="patchObfuscationRegex"></editable-text-field>
        </td>
        <td>
            <editable-text-field style="font-family: monospace" :should-link="false" v-model="gameCopy.forceUnhollowerVersion" v-on:save="patchUnhollowerVersion"></editable-text-field>
        </td>
        <td>
            <editable-text-field style="font-family: monospace" :should-link="false" v-model="gameCopy.forceCpp2IlVersion" v-on:save="patchDumperVersion"></editable-text-field>
        </td>
        <td>
            <button @mouseenter="mouseEnter" @mouseleave="mouseLeave"
                    :class="{'purge-sha-button': true, disabled: !canPurgeCachedSHA || !game.mappingFileSHA512}"
                    @click="purgeSha(game)">
                <i class="fa fa-trash-alt"></i>
            </button>
            <div class="button-tooltip" v-show="buttonHasMouse && (!canPurgeCachedSHA || !game.mappingFileSHA512 || justPurged)">
                <span v-if="!canPurgeCachedSHA">You're not allowed to do this</span>
                <span v-else-if="!game.mappingUrl">Game doesn't have any mappings</span>
                <span v-else-if="justPurged">Hash Purged</span>
                <span v-else-if="!game.mappingFileSHA512">Hash has recently been purged and not recalculated yet.</span>
            </div>
        </td>
    </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Game from '@/model/Game'
import axios from 'axios'
import { createPopper } from '@popperjs/core'
import EditableTextField from '@/components/EditableTextField.vue'

@Component({
    components: { EditableTextField }
})
export default class GameListEntry extends Vue {
    @Prop({
        default: null,
        required: true
    })
    public game!: Game

    public buttonHasMouse = false
    public justPurged = false

    private gameCopy?: Game = undefined;

    public created (): void {
        this.gameCopy = this.game;
    }

    public mounted (): void {
        createPopper(this.$el.querySelector('.purge-sha-button') as Element, this.$el.querySelector('.button-tooltip') as HTMLElement, {
            placement: 'left-start',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [3, 0],
                    },
                },
            ]
        });
    }

    public mouseEnter (): void {
        this.buttonHasMouse = true
    }

    public mouseLeave (): void {
        this.buttonHasMouse = false
        this.justPurged = false
    }

    get canPurgeCachedSHA (): boolean {
        return this.$store.state.storeModule.role !== 'editor'
    }

    public async purgeSha (game: Game): Promise<void> {
        if (!this.canPurgeCachedSHA || !game.mappingFileSHA512) {
            return
        }

        try {
            await axios.delete(`https://melon.samboy.dev/api/v1/game/${game.gameSlug}/mapSha512`)

            game.mappingFileSHA512 = null
            this.justPurged = true
        } catch (e) {
            // Failed
        }
    }

    public async patchMappingUrl (): Promise<void> {
        if (!this.canPurgeCachedSHA)
            return;

        try {
            await axios.patch(`https://melon.samboy.dev/api/v1/game/${this.game.gameSlug}/mappingUrl`, {
                mappingUrl: this.gameCopy?.mappingUrl,
            });

            this.game.mappingFileSHA512 = null;
        } catch (e) {
            // Failed
        }
    }

    public async patchObfuscationRegex (): Promise<void> {
        if (!this.canPurgeCachedSHA)
            return;

        try {
            await axios.patch(`https://melon.samboy.dev/api/v1/game/${this.game.gameSlug}/obfuscationRegex`, {
                obfuscationRegex: this.gameCopy?.obfuscationRegex,
            });
        } catch (e) {
            // Failed
        }
    }

    public async patchUnhollowerVersion (): Promise<void> {
        if (!this.canPurgeCachedSHA)
            return;

        try {
            await axios.patch(`https://melon.samboy.dev/api/v1/game/${this.game.gameSlug}/unhollowerVersion`, {
                unhollowerVersion: this.gameCopy?.forceUnhollowerVersion,
            });
        } catch (e) {
            // Failed
        }
    }

    public async patchDumperVersion (): Promise<void> {
        if (!this.canPurgeCachedSHA)
            return;

        try {
            await axios.patch(`https://melon.samboy.dev/api/v1/game/${this.game.gameSlug}/dumperVersion`, {
                dumperVersion: this.gameCopy?.forceCpp2IlVersion,
            });
        } catch (e) {
            // Failed
        }
    }
}
</script>

<style scoped lang="scss">
$buttonColor: #e74c3c;

td {
    margin: 0 1rem;
}

.button-tooltip {
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    font-size: 13px;
}

.purge-sha-button {
    background: $buttonColor;
    border: none;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
    padding: 0.5rem 1rem;
    height: 32px;
    margin: 4px;

    &.disabled {
        background: lighten($buttonColor, 15%);
        cursor: not-allowed;
    }

    &:not(.disabled):hover {
        background: darken($buttonColor, 10%);
    }
}

td {
    text-align: center;
    vertical-align: middle;
}
</style>
