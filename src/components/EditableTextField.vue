<template>
    <div class="editable-text-field">
        <div v-if="editMode" class="edit-mode-wrapper">
            <input class="edit-field-box" v-model="proxyValue">
            <button class="save-button" @click="save"><i class="fa fa-save"></i></button>
        </div>
        <div v-else>
            <a v-if="shouldLink" :href="proxyValue">{{ proxyValue }}</a>
            <span v-else>{{ proxyValue ? proxyValue : 'N/A' }}</span>

            <i class="edit-text-field fa fa-pencil-alt" @click="editMode = true"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class EditableSpan extends Vue {
    @Prop({
        required: true,
    })
    public value!: string;

    @Prop({
        required: false,
        default: () => false
    })
    public shouldLink!: boolean;

    private editMode = false

    private editedValue = ''

    public mounted (): void {
        this.editedValue = this.value
    }

    get proxyValue (): string {
        return this.editedValue
    }

    set proxyValue (value: string) {
        this.editedValue = value
        this.$emit('input', this.editedValue)
    }

    public save (): void {
        this.editMode = false;
        this.$emit('save');
    }
}
</script>

<style scoped lang="scss">
.edit-mode-wrapper {
    display: flex;
    flex-flow: row nowrap;

    .edit-field-box {
        flex-grow: 1;
        border: 1px solid #ccc;
        border-right: none;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        padding: 0.5rem;
        outline: none;
    }

    .save-button {
        cursor: pointer;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border: none;
        background: #27ae60;
        outline: none;
        color: white;
        padding: 0.5rem;
    }
}

.edit-text-field {
    color: #aaa;
    margin-left: 8px;
    cursor: pointer;

    &:hover {
        color: #333;
    }
}
</style>
