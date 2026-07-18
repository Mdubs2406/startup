export class Access {
    static Unknown = new Access('unkown');
    static Granted = new Access('granted');
    static Hold = new Access('Hold');

    constructor(state) {
        this.state = state;
    }
}