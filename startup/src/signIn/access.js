export class Access {
  static Unknown = new Access('unkown');
  static Granted = new Access('granted');
  static Pending = new Access('pending');

  constructor(state) {
    this.state = state;
  }
}