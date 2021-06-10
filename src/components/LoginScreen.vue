<template>
    <div id="login-screen">
        <input id="login-username" placeholder="Username" v-model="username" @keydown.enter="checkCreds">
        <input id="login-password" type="password" placeholder="Password" v-model="password" @keydown.enter="checkCreds">
        <button id="login-button" @click="checkCreds">Login</button>
        <span id="bad-credentials-message" v-if="badCreds">These credentials do not match our records</span>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'

// noinspection JSUnusedGlobalSymbols
@Component({})
export default class LoginScreen extends Vue {
    private username = '';
    private password = '';

    private badCreds = false;

    public mounted (): void {
        const sessionId = localStorage.getItem('sessionId');

        if (!sessionId) {
            this.tryLoginFromCachedCredentials();
            return;
        }

        this.$store.commit('storeModule/setSessionId', sessionId);
        this.checkSessionId();
    }

    private async tryLoginFromCachedCredentials (): Promise<void> {
        const username = localStorage.getItem('username');
        if (username) {
            this.username = username;
            this.password = localStorage.getItem('password') as string;

            await this.checkCreds();
        }
    }

    private async checkSessionId (): Promise<void> {
        try {
            const res = await axios.post('https://melon.samboy.dev/api/v1/user/check-session', {
                sessionId: this.$store.state.storeModule.sessionId
            });

            this.$store.commit('storeModule/setNameAndRole', res.data);
            this.configureAxios();
        } catch (e) {
            // Invalid session, try to log in with saved creds
            console.warn('Session id is invalid, attempting to re-login with saved credentials');
            localStorage.removeItem('sessionId');
            await this.tryLoginFromCachedCredentials();
        }
    }

    private async checkCreds (): Promise<void> {
        this.badCreds = false;
        try {
            const res = await axios.post('https://melon.samboy.dev/api/v1/user/check-creds', {
                username: this.username,
                password: this.password
            });

            this.$store.commit('storeModule/setNameAndRole', res.data);
            this.$store.commit('storeModule/setSessionId', res.data.sessionId);

            localStorage.setItem('username', this.username);
            localStorage.setItem('password', this.password);
            localStorage.setItem('sessionId', res.data.sessionId);

            this.configureAxios();
        } catch (e) {
            // Ignore
            console.warn('Login request failed');

            localStorage.removeItem('username');
            localStorage.removeItem('password');

            this.badCreds = true;
        }
    }

    private configureAxios (): void {
        axios.defaults.headers.common['X-SESSION-ID'] = this.$store.state.storeModule.sessionId;
    }
}
</script>

<style scoped lang="scss">
#login-screen {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    #login-username, #login-password {
        margin: 0.5rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        outline: none;
        background: none;
        font-family: inherit;
        width: 300px;
    }

    #login-button {
        background: #42b983;
        border: none;
        outline: none;
        padding: 0.5rem 1rem;
        color: white;
        cursor: pointer;
        border-radius: 8px;
        width: 300px;

        &:hover {
            background: darken(#42b983, 10%);
        }
    }

    #bad-credentials-message {
        color: red;
        margin-top: 0.5rem;
        text-align: center;
        align-self: center;
    }
}
</style>
