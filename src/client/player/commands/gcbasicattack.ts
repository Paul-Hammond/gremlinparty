import Vec2 from '../../math/gcVec2.js';
import gcCommand from './clientcommand.js';

export default class gcBasicAttackCommand extends gcCommand {
    //(3/20/22) remember all gcCommands have the following fields:
    //    readonly senderGremlinID: string;
    //    readonly commandTitle: string;

    readonly mouseDir: Vec2;

    constructor(sender: string, title: string, mouseDir: Vec2) {
        super(sender, title);
        this.mouseDir = mouseDir;
    }
}