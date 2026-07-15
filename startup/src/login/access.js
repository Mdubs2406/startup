export class Access {
    static Unkown = new Access('unkown');
    static Granted = new Access('granted');
    static Hold = new Access('onHold');

    constructor(state) {
        this.state = state;
    }
}