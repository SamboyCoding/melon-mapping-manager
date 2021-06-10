import Vue from 'vue'
import Vuex from 'vuex'
import { createModule, extractVuexModule, Module, mutation } from 'vuex-class-component'
import Game from '@/model/Game'

Vue.use(Vuex);

const VuexModule = createModule({
    strict: false,
    namespaced: 'storeModule'
});

@Module({
    target: 'core',
    namespacedPath: 'storeModule'
})
export class StoreModule extends VuexModule {
    private currentPage = 'game-list';
    private username = '';
    private role = '';
    private games: Game[] = [];
    private sessionId = '';

    @mutation
    public setSessionId (payload: string): void {
        this.sessionId = payload;
    }

    @mutation
    public setNameAndRole (payload: {username: string, role: string}): void {
        this.username = payload.username;
        this.role = payload.role;
    }

    @mutation
    public setGames (payload: Game[]): void {
        this.games = payload;
    }

    @mutation
    public setCurrentPage (payload: string): void {
        this.currentPage = payload;
    }
}

export default new Vuex.Store({
    modules: {
        ...extractVuexModule(StoreModule)
    }
})
