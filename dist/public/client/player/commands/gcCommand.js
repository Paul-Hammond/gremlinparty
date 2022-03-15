//(3/13/22) a gcCommand is the base class for all commands sent by a user to the server
export default class gcCommand {
    constructor(sender, title) {
        this.senderGremlinID = sender;
        this.commandTitle = title;
    }
}
