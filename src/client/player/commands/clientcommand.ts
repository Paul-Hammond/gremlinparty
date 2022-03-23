//(3/13/22) a gcCommand is the base class for all commands sent by a user to the server
export default class gcCommand {
    readonly senderGremlinID: string;
    readonly commandTitle: string;

    constructor(sender: string, title: string) {
        this.senderGremlinID = sender;
        this.commandTitle = title;
    }
}