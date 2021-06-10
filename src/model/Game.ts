export default class Game {
    public gameSlug!: string
    public gameName!: string
    public mappingUrl?: string
    public obfuscationRegex?: string;
    public forceUnhollowerVersion?: string;
    public forceCpp2IlVersion?: string;
    public mappingFileSHA512: string | null = null
}
